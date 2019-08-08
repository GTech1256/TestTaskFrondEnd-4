import apiRequest from '../utils/apiRequest';

/**
 *
 * @param {{ search:String, page:String|Number }} params
 */
export function getAllStarshipResources({ search, page }) {
  return apiRequest({
    url: '/starships',
    params: {
      search,
      page,
    },
  });
}

export function getSpecificStarshipResources({ id }) {
  return apiRequest({
    url: `/starships/${id}`,
  });
}

/**
 * @description внутри есть описание полей на англ.
 */
export function getJSONSchema() {
  return apiRequest({
    url: '/starships/schema',
  });
}
