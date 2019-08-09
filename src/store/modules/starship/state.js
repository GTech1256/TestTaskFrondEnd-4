import { getData } from '@/utils/cache/localDB';

export default {
  starshipsCache: getData('starshipsCache') || {
    // [starship_id]: starship,
  },
  pageStarshipsCache: getData('pageStarshipsCache') || {
    // [page]: { starshipsId: [starship_id, starship_id, ....], expiresIn: Date }
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
