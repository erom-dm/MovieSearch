import { CHANGE_SEARCH_TYPE, CHANGE_SORT_TYPE } from '../actions/search/actions';

const searchReducer = (state = { searchBy: 'Title', sortBy: 'Rating' }, action) => {
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
    default:
      return state;
  }
};

export default searchReducer;
