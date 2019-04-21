import { DISCOVER } from '../actions/movies/actions';

const movieReducer = (state = [], action) => {
  switch (action.type) {
    case DISCOVER:
      return [
        ...state,
        ...action.payload,
      ];
    default:
      return state;
  }
};

export default movieReducer;
