import {
  SET_MODULE_STARSHIP_NEXT_PAGE,
  SET_MODULE_STARSHIP_COUNT,
  SET_FETCH_STATUS_LOADING,
  SET_FETCH_STATUS_SUCCESS,
  SET_FETCH_STATUS_ERROR,
  INIT_STARSHIPS_CACHE,
  FETCH_ONE_STARSHIP,
  SET_STARSHIPS,
} from '@/store/types';

export default {
  [FETCH_ONE_STARSHIP](state, starship) {
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
  [INIT_STARSHIPS_CACHE](state) {
    state.starshipsCache = JSON.parse(localStorage.getItem('starshipsCache'));
    console.log(state.starshipsCache);
  },
};
