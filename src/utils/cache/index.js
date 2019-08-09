import expiresInTimestamp from './expireTimer';

import { setData } from './localDB';

/**
 *
 * @param {Object} starshipsCache - кэш всех загруженных кораблей в vuex
 * @param {Object} newStarships
 * @description создает id кораблей по starship.url и кэширует сами корабли
 */
export default function cache({ starshipsCache, pageStarshipsCache }, newStarships, page) {
  const { expiresIn, timeNow } = expiresInTimestamp();
  const res = [];

  let pageCacheWillUpdate = false;

  // page cache check
  if (page && (!pageStarshipsCache[page] || !pageStarshipsCache[page].expiresIn < timeNow)) {
    // eslint-disable-next-line no-param-reassign
    pageStarshipsCache[page] = {
      starshipsId: [],
      expiresIn,
    };

    pageCacheWillUpdate = true;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const starship of newStarships) {
    const id = starship.url.match(/(\d+)+\/?$/)[1];

    // eslint-disable-next-line no-underscore-dangle
    let _starship = starshipsCache[id];
    // starship cache update
    if (!_starship || _starship.expiresIn < timeNow) {
      _starship = {
        ...starship,
        id,
        expiresIn,
      };
      // eslint-disable-next-line no-param-reassign
      starshipsCache[id] = _starship;
    }

    if (pageCacheWillUpdate) {
      pageStarshipsCache[page].starshipsId.push(id);
    }

    res.push(_starship);
  }

  setData('starshipsCache', starshipsCache);

  if (pageCacheWillUpdate) {
    setData('pageStarshipsCache', pageStarshipsCache);
  }
  return res;
}
