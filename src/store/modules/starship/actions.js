import {
  getAllStarshipResources,
  getSpecificStarshipResources,
  getJSONSchema,
} from '@/api/starships';

import {
  SET_MODULE_STARSHIP_COUNT,
  SET_MODULE_STARSHIP_NEXT_PAGE,
  SET_STARSHIPS,
  SET_FETCH_STATUS_LOADING,
  SET_FETCH_STATUS_SUCCESS,
  SET_FETCH_STATUS_ERROR,
  FETCH_STARSHIPS_SCHEMA,
  SET_STARSHIPS_SCHEMA,
  FETCH_ONE_STARSHIP,
  SET_STARSHIP_BY_ID,
  FETCH_STARSHIPS,
} from '@/store/types';

import cache from '@/utils/cache/index';
import {
  loadFromCache,
} from '@/utils/cache/loaders';
import expiresInTimestamp from '@/utils/cache/expireTimer';

/**
 *
 * @param {*} param0
 * @param {Array, Number, String} param1
 * @param {*} page
 */
function setALLStarships({ state, commit }, { results, count, next }, page, willCache = true) {
  if (count) {
    commit(SET_MODULE_STARSHIP_COUNT, count);
  }
  if (next) {
    commit(SET_MODULE_STARSHIP_NEXT_PAGE, next.match(/(\d+)+\/?$/)[1]);
  }
  commit(SET_STARSHIPS, willCache ? cache(state, results, page) : results);
  // }
}

function forceFetch({ state, commit }, query, page) {
  commit(SET_FETCH_STATUS_LOADING);

  return getAllStarshipResources({ search: query, page })
    .then(({ data }) => {
      setALLStarships({ state, commit }, data, page);
      commit(SET_FETCH_STATUS_SUCCESS);
    })
    .catch((e) => {
      commit(SET_FETCH_STATUS_ERROR);
      throw new Error(e);
    });
}


export default {
  [FETCH_STARSHIPS_SCHEMA]({ commit }) {
    return getJSONSchema()
      .then(({ data }) => {
        commit(SET_STARSHIPS_SCHEMA, data.properties);
      });
  },
  [FETCH_ONE_STARSHIP]({ state, commit }, { id }) {
    const cachedStarship = state.starshipsCache[id];
    const { timeNow } = expiresInTimestamp();

    if (cachedStarship && cachedStarship.expiresIn > timeNow) {
      commit(SET_STARSHIP_BY_ID, cachedStarship);
      return;
    }

    commit(SET_FETCH_STATUS_LOADING);
    getSpecificStarshipResources({ id })
      .then(({ data }) => {
        commit(SET_STARSHIP_BY_ID, cache(state, [data])[0]);
        commit(SET_FETCH_STATUS_SUCCESS);
      })
      .catch((e) => {
        commit(SET_FETCH_STATUS_ERROR);
        throw new Error(e);
      });
  },
  [FETCH_STARSHIPS](store, { query, page, isForceLoad = false }) {
    try {
      if (!Object.keys(store.state.starshipsCache).length || isForceLoad) {
        return forceFetch(store, query, page);
      }
      console.log('cache load');
      return loadFromCache(store, { query, page })
        .then(({
          nextPage,
          starships: results,
        }) => setALLStarships(store, { results, count: store.state.count, next: `${nextPage}` }, page, false))
        .catch(() => forceFetch(store, query, page));
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  },
};
