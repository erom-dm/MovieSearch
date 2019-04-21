const movieReducer = (state = {}, action) => {
  switch (action.type) {
    case 'something':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default movieReducer;
