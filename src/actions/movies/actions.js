export const DISCOVER = 'DISCOVER';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export const discoverMovie = payload => ({
  type: DISCOVER,
  payload,
});

export const changePage = payload => ({
  type: CHANGE_PAGE,
  payload,
});
