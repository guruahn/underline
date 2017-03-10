import { combineReducers } from 'redux';
import myBooks from '../books/BooksReducer';

const reducers = combineReducers({
  myBooks
});

export default reducers;
