import { setActivePage } from './actions';

export default function storeActivePage(pageNum) {
  return (dispatch) => {
    dispatch(setActivePage({ activePage: pageNum }));
  };
}
