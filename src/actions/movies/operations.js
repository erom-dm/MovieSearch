import _ from 'lodash';
import FetchData from '../../util/FetchData';
import { discoverMovie } from './actions';
import { setTotalPages, saveLastQuery, setActivePage } from '../search/actions';
import { discover, searchPerson, searchGenres } from '../../util/queries';

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
    const discoverQuery = (queryValue) => {
      const queryString = discover(queryValue, sortBy, searchBy, order);
      FetchData.get(queryString).then((data) => {
        const sortedData = sortMovies(data.results, sortBy, order);
        dispatch(setTotalPages({ totalPages: data.total_pages }));
        dispatch(discoverMovie(sortedData));
        dispatch(setActivePage({ activePage: 1 }));
        dispatch(saveLastQuery({ lastQuery: queryString }));
      }).catch(error => console.log(error));
    };

    if (searchBy === 'Actor') {
      FetchData.get(searchPerson(value)).then((personData) => {
        let personId = null;
        if (value.toLowerCase() === personData.results[0].name.toLowerCase()) {
          personId = personData.results[0].id;
        }
        discoverQuery(personId);
      }).catch(error => console.log(error));
    } else if (searchBy === 'Genre') {
      FetchData.get(searchGenres()).then((genreData) => {
        let genreId = null;
        genreData.genres.forEach((item) => {
          if (item.name.toLowerCase() === value.toLowerCase()) {
            genreId = item.id;
          }
          discoverQuery(genreId);
        });
      }).catch(error => console.log(error));
    } else {
      discoverQuery(value);
    }
  };
}
