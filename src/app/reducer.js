import { combineReducers } from 'redux';
import books from '../books/BooksReducer';
import bookDetail from '../books/BookDetailReducer.js';
import underlines from '../underlines/UnderlinesReducer';
import search from '../search/SearchReducer';

const reducers = combineReducers({
  books, bookDetail, underlines, search
});

export default reducers;
