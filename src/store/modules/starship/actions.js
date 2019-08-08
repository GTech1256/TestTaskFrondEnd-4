import {
  getAllStarshipResources,
  getSpecificStarshipResources,
} from '@/api/starships';

import {
  SET_MODULE_STARSHIP_COUNT,
  SET_MODULE_STARSHIP_NEXT_PAGE,
  SET_STARSHIPS,
  SET_FETCH_STATUS_LOADING,
  SET_FETCH_STATUS_SUCCESS,
  SET_FETCH_STATUS_ERROR,
  FETCH_ONE_STARSHIP,
  FETCH_STARSHIPS,
} from '@/store/types';

/**
 * @returns timestamp
 */
function expiresInTimestamp() {
  const expiresIn = new Date();
  expiresIn.setMinutes(expiresIn.getMinutes() + 5);

  return expiresIn.getTime();
}

/**
 *
 * @param {Object} starshipsCache - кэш всех загруженных кораблей в vuex
 * @param {Object} newStarships
 * @description создает id кораблей по starship.url и кэширует сами корабли
 */
function cache(starshipsCache, newStarships) {
  const expiresIn = expiresInTimestamp();
  const res = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const starship of newStarships) {
    const id = starship.url.match(/(\d+)+\/?$/)[1];
    // eslint-disable-next-line no-underscore-dangle
    let _starship = starshipsCache[id];

    if (!_starship || _starship.expiresIn < expiresIn) {
      _starship = {
        ...starship,
        id,
        expiresIn,
      };
      // eslint-disable-next-line no-param-reassign
      starshipsCache[id] = _starship;
    }

    res.push(_starship);
  }

  localStorage.setItem('starshipsCache', JSON.stringify(starshipsCache));

  return res;
}


function setALLStarships({ state, commit }, { results, count, next }) {
  /**
   * count: 37
    next: "https://swapi.co/api/starships/?page=2"
    previous: null
  */
  if (results.length !== 0) {
    commit(SET_MODULE_STARSHIP_COUNT, count);
    commit(SET_MODULE_STARSHIP_NEXT_PAGE, next.match(/(\d+)+\/?$/)[1]);
    commit(SET_STARSHIPS, cache(state.starshipsCache, results));
  }
  commit(SET_FETCH_STATUS_SUCCESS);
}

function forceFetch({ state, commit }, query, page) {
  commit(SET_FETCH_STATUS_LOADING);
  getAllStarshipResources({ search: query, page })
    .then(({ data }) => setALLStarships({ state, commit }, data, page))
    .catch((e) => {
      commit(SET_FETCH_STATUS_ERROR);
      throw new Error(e);
    });
}

function loadFromCache({ state, commit }, { query = '', page = 1 }) {
  const expiresIn = expiresInTimestamp();
  const starships = Object.values(state.starshipsCache)
    .filter(
      starship => starship.expiresIn > expiresIn
        && starship.name.match(query),
    );

  if (starships.length === 0) {
    forceFetch(state, query, page);
  } else {
    commit(SET_MODULE_STARSHIP_NEXT_PAGE, starships.length > 10 * page ? page + 1 : page);
    commit(SET_STARSHIPS, starships.slice((page - 1) * 10, page * 10));
    commit(SET_FETCH_STATUS_SUCCESS);
  }
}

export default {
  [FETCH_ONE_STARSHIP]({ state, commit }, { id }) {
    const cachedStarship = state.starships[id];
    const expiresIn = expiresInTimestamp();

    if (cachedStarship && cachedStarship.expiresIn < expiresIn) {
      commit(FETCH_ONE_STARSHIP, cachedStarship);
      return;
    }

    commit(SET_FETCH_STATUS_LOADING);
    getSpecificStarshipResources({ id })
      .then(({ data }) => {
        commit(FETCH_ONE_STARSHIP, cache(state.starshipsCache, [data])[0]);
        commit(SET_FETCH_STATUS_SUCCESS);
      })
      .catch((e) => {
        commit(SET_FETCH_STATUS_ERROR);
        throw new Error(e);
      });
  },
  [FETCH_STARSHIPS](store, { query, page }) {
    if (!Object.keys(store.state.starshipsCache).length) {
      forceFetch(store, query, page);
      return;
    }

    loadFromCache(store, { query, page });
  },
};
