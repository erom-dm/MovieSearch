import { CHANGE_SEARCH_TYPE, CHANGE_SORT_TYPE, SET_TOTAL_PAGES } from '../actions/search/actions';

const defaultState = {
  searchBy: 'Title',
  sortBy: 'Rating',
  totalPages: 0,
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
    default:
      return state;
  }
};

export default searchReducer;
