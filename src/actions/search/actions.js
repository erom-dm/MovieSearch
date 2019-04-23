export const CHANGE_SEARCH_TYPE = 'CHANGE_SEARCH_TYPE';
export const CHANGE_SORT_TYPE = 'CHANGE_SORT_TYPE';

export const changeSearchType = payload => ({
  type: CHANGE_SEARCH_TYPE,
  payload,
});

export const changeSortType = payload => ({
  type: CHANGE_SORT_TYPE,
  payload,
});
