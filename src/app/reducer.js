import { combineReducers } from 'redux';
import myBooks from '../mybooks/MyBooksReducer';

const reducers = combineReducers({
  myBooks
});

export default reducers;
