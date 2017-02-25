import { combineReducers } from 'redux';
import search from './search';
import myBooks from './myBooks';

const reducers = combineReducers({
  search, myBooks
});

export default reducers;
