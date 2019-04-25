import { combineReducers } from 'redux';
import movies from './movies';
import util from './util';

const rootReducer = combineReducers({
  movies,
  util,
});

export default rootReducer;
