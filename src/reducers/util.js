import {
  CHANGE_SEARCH_TYPE, CHANGE_SORT_TYPE, SET_TOTAL_PAGES, SAVE_LAST_QUERY, SET_ACTIVE_PAGE,
  CHANGE_SORT_MODE, CHANGE_VIEW_MODE,
} from '../actions/search/actions';

const defaultState = {
  searchBy: 'Title',
  sortBy: 'Rating',
  sortMode: 'desc',
  totalPages: 0,
  activePage: 0,
  lastQuery: '',
  minimizedView: false,
};

const searchReducer = (state = defaultState, action) => {
  const trigger = (action.type === CHANGE_SEARCH_TYPE
  || action.type === CHANGE_SORT_TYPE
  || action.type === SET_TOTAL_PAGES
  || action.type === SAVE_LAST_QUERY
  || action.type === SET_ACTIVE_PAGE
  || action.type === CHANGE_SORT_MODE
  || action.type === CHANGE_VIEW_MODE);

  if (trigger) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
};

export default searchReducer;
