import {
  CHANGE_SEARCH_TYPE, CHANGE_SORT_TYPE, SET_TOTAL_PAGES, SAVE_LAST_QUERY, SET_ACTIVE_PAGE,
} from '../actions/search/actions';

const defaultState = {
  searchBy: 'Title',
  sortBy: 'Rating',
  totalPages: 0,
  activePage: 0,
  lastQuery: null,
};

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_TYPE:
      return {
        ...state,
        ...action.payload,
      };
    case CHANGE_SORT_TYPE:
      return {
        ...state,
        ...action.payload,
      };
    case SET_TOTAL_PAGES:
      return {
        ...state,
        ...action.payload,
      };
    case SAVE_LAST_QUERY:
      return {
        ...state,
        ...action.payload,
      };
    case SET_ACTIVE_PAGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
