import _ from 'lodash';
import FetchData from '../../util/FetchData';
import { discoverMovie } from './actions';
import { discover } from '../../util/queries';

const sortMovies = (data, sortBy) => {
  const sortOrder = 'desc';
  let iteratee;
  switch (sortBy) {
    case 'Rating':
      iteratee = 'vote_average';
      break;
    case 'Popularity':
      iteratee = 'popularity';
      break;
    case 'Release year':
      iteratee = 'release_date';
      break;
    default:
      iteratee = 'vote_average';
  }

  if (sortBy === 'Release year') {
    return _.chain(data)
      .mapValues((value, key) => {
        if (key === iteratee) {
          return Number(value.substr(0, 4));
        }
        return value;
      })
      .orderBy(iteratee, sortOrder)
      .value();
  }
  return _.orderBy(data, [iteratee], [sortOrder]);
};

export default function searchMovies(value, sortBy, searchBy) {
  return (dispatch) => {
    FetchData.get(discover(value, sortBy, searchBy)).then((data) => {
      const sortedData = sortMovies(data.results, sortBy);
      dispatch(discoverMovie(sortedData));
    }).catch(error => console.log(error));
  };
}
