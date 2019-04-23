import FetchData from '../../util/FetchData';
import { discoverMovie } from './actions';
import { discover } from '../../util/queries';

export const discoverMovies = year => (dispatch) => {
  FetchData.get(discover(year)).then((data) => {
    dispatch(discoverMovie(data.results));
  }).catch(error => console.log(error));
};
