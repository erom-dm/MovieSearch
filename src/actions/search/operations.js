import { saveLastQuery, setActivePage, setTotalPages } from './actions';
import { modifyOldQuery } from '../../util/queries';
import FetchData from '../../util/FetchData';
import { discoverMovie } from '../movies/actions';

export default function storeActivePage(pageNum, oldQuery) {
  return (dispatch) => {
    const newQuery = modifyOldQuery(pageNum, oldQuery);
    FetchData.get(newQuery).then((data) => {
      dispatch(setTotalPages({ totalPages: data.total_pages }));
      dispatch(discoverMovie(data.results));
      dispatch(saveLastQuery({ lastQuery: newQuery }));
    }).catch(error => console.log(error));
    dispatch(setActivePage({ activePage: pageNum }));
  };
}
