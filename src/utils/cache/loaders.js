import expiresInTimestamp from './expireTimer';

function loadCachedStarships(state, timeNow, page) {
  const cached = state.pageStarshipsCache[page].starshipsId
    .map(id => state.starshipsCache[id]);

  return cached.every(starship => starship)
    ? cached.filter(starship => starship && starship.expiresIn > timeNow)
    : [];
}

function loadCachedStarshipsByQuery(state, timeNow, page, query) {
  return Object.values(state.starshipsCache)
    .filter(
      starship => starship.expiresIn > timeNow
        && starship.name.match(query),
    )
    .slice((page - 1) * 10, page * 10);
}

// eslint-disable-next-line import/prefer-default-export
export function loadFromCache({ state }, { query = '', page = 1 }) {
  const { timeNow } = expiresInTimestamp();

  // page cache check
  if (!state.pageStarshipsCache[page] || state.pageStarshipsCache[page].expiresIn < timeNow) {
    return Promise.reject(new Error('page cache empty or expires'));
  }

  const starships = query.trim() === ''
    ? loadCachedStarships(state, timeNow, page)
    : loadCachedStarshipsByQuery(state, timeNow, page, query);


  if (starships.length === 0) {
    return Promise.reject(new Error('starships cache empty or expires'));
  }
  return Promise.resolve({
    nextPage: starships.length > 10 * page ? page + 1 : page,
    starships,
  });
}
