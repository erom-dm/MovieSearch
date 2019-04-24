import _ from 'lodash';
import FetchData from '../../util/FetchData';
import { discoverMovie } from './actions';
import { discover, searchPerson, searchGenres } from '../../util/queries';

// todo: sorting redundant?

const sortMovies = (data, sortBy, order) => {
  const sortOrder = order;
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
        if (key === 'vote_average' && el.vote_count < 500) {
          return `(< 500 votes) ${value}`;
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

export default function searchMovies(value, sortBy, searchBy, order) {
  return (dispatch) => {
    if (searchBy === 'Actor') {
      FetchData.get(searchPerson(value)).then((personData) => {
        let personId = null;
        if (value.toLowerCase() === personData.results[0].name.toLowerCase()) {
          personId = personData.results[0].id;
        }
        FetchData.get(discover(personId, sortBy, searchBy, order)).then((data) => {
          const sortedData = sortMovies(data.results, sortBy, order);
          dispatch(discoverMovie(sortedData));
        }).catch(error => console.log(error));
      }).catch(error => console.log(error));
    } else if (searchBy === 'Genre') {
      FetchData.get(searchGenres()).then((genreData) => {
        let genreId = null;
        genreData.genres.forEach((item) => {
          if (item.name.toLowerCase() === value.toLowerCase()) {
            genreId = item.id;
          }
          FetchData.get(discover(genreId, sortBy, searchBy, order)).then((data) => {
            const sortedData = sortMovies(data.results, sortBy, order);
            dispatch(discoverMovie(sortedData));
          }).catch(error => console.log(error));
        });
      }).catch(error => console.log(error));
    } else {
      FetchData.get(discover(value, sortBy, searchBy, order)).then((data) => {
        const sortedData = sortMovies(data.results, sortBy, order);
        dispatch(discoverMovie(sortedData));
      }).catch(error => console.log(error));
    }
  };
}
