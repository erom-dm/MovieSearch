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

  const editedData = (input) => {
    const result = [];
    input.forEach((el) => {
      result.push(_.mapValues(el, (value, key) => {
        if (key === 'vote_average' && el.vote_count < 1000) {
          return `${value} (< 1000 votes)`;
        }
        return value;
      }));
    });
    return result;
  };

  if (sortBy === 'Release year') {
    return _.chain(editedData(data))
      .mapValues((value, key) => {
        if (key === iteratee) {
          return Number(value.substr(0, 4));
        }
        return value;
      })
      .orderBy(iteratee, sortOrder)
      .value();
  }
  return _.chain(editedData(data))
    .orderBy([iteratee], [sortOrder])
    .value();
};

export default function searchMovies(value, sortBy, searchBy) {
  return (dispatch) => {
    FetchData.get(discover(value, sortBy, searchBy)).then((data) => {
      const sortedData = sortMovies(data.results, sortBy);
      dispatch(discoverMovie(sortedData));
    }).catch(error => console.log(error));
  };
}
