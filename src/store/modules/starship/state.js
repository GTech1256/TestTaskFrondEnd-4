export default {
  starshipsCache: {
    // [starship_id]: starship
  },
  starshipsStatus: 0,
  starshipById: null,
  starshipsStatuses: {
    loading: 0,
    success: 1,
    error: 2,
  },
  starships: [], // for output
  starshipsCount: 0,
  starshipsNextPage: 1,
  starshipSchema: {},
};
