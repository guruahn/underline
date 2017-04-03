import { combineReducers } from 'redux';
import books from '../books/BooksReducer';
import bookDetail from '../books/BookDetailReducer.js';
import underlines from '../underlines/UnderlinesReducer';

const reducers = combineReducers({
  books, bookDetail, underlines
});

export default reducers;
