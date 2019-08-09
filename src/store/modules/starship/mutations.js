import {
  SET_MODULE_STARSHIP_NEXT_PAGE,
  SET_MODULE_STARSHIP_COUNT,

  SET_FETCH_STATUS_LOADING,
  SET_FETCH_STATUS_SUCCESS,
  SET_FETCH_STATUS_ERROR,

  SET_PAGE_STARSHIPS_CACHE,
  SET_STARSHIPS_CACHE,
  SET_STARSHIP_BY_ID,
  SET_STARSHIPS,
} from '@/store/types';

export default {
  [SET_STARSHIP_BY_ID](state, starship) {
    state.starshipById = starship;
  },
  [SET_STARSHIPS](state, starships) {
    state.starships = starships;
  },
  [SET_FETCH_STATUS_LOADING](state) {
    state.starshipsStatus = state.starshipsStatuses.loading;
  },
  [SET_FETCH_STATUS_SUCCESS](state) {
    state.starshipsStatus = state.starshipsStatuses.success;
  },
  [SET_FETCH_STATUS_ERROR](state) {
    state.starshipsStatus = state.starshipsStatuses.error;
  },
  [SET_MODULE_STARSHIP_COUNT](state, count) {
    state.count = count;
  },
  [SET_MODULE_STARSHIP_NEXT_PAGE](state, starshipsNextPage) {
    state.starshipsNextPage = starshipsNextPage;
  },
  [SET_STARSHIPS_CACHE](state, newCache) {
    state.starshipsCache = newCache;
  },
  [SET_PAGE_STARSHIPS_CACHE](state, newCache) {
    state.starshipsCache = newCache;
  },
};
