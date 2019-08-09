export default {
  starships: state => state.starships,
  starshipsCount: state => state.starshipsCount,
  nextPage: state => state.starshipsNextPage,
  starshipById: state => state.starshipById,
  starshipSchema: state => state.starshipSchema,
  starshipsPageCounts: state => (state.starshipsCount / 10).toFixed(),
  starshipsIsLoading: state => state.starshipsStatus === state.starshipsStatuses.loading,
};
