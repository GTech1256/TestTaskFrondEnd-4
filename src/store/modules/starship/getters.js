export default {
  starships: state => state.starships,
  starshipsCount: state => state.starshipsCount,
  nextPage: state => state.starshipsNextPage,
  starshipById: state => state.starshipById,
  starshipSchema: state => state.starshipSchema,
  starshipsIsLoading: state => state.starshipsStatus === state.starshipsStatuses.loading,
};
