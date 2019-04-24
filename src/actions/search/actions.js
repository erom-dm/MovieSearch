export const CHANGE_SEARCH_TYPE = 'CHANGE_SEARCH_TYPE';
export const CHANGE_SORT_TYPE = 'CHANGE_SORT_TYPE';
export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
export const SAVE_LAST_QUERY = 'SAVE_LAST_QUERY';
export const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE';
export const CHANGE_SORT_MODE = 'CHANGE_SORT_MODE';

export const changeSearchType = payload => ({
  type: CHANGE_SEARCH_TYPE,
  payload,
});

export const changeSortType = payload => ({
  type: CHANGE_SORT_TYPE,
  payload,
});

export const setTotalPages = payload => ({
  type: SET_TOTAL_PAGES,
  payload,
});

export const saveLastQuery = payload => ({
  type: SAVE_LAST_QUERY,
  payload,
});

export const setActivePage = payload => ({
  type: SET_ACTIVE_PAGE,
  payload,
});

export const changeSortMode = payload => ({
  type: CHANGE_SORT_MODE,
  payload,
});
