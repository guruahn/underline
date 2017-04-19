import { combineReducers } from 'redux';
import books from '../books/BooksReducer';
import bookDetail from '../books/BookDetailReducer.js';
import underlines from '../underlines/UnderlinesReducer';
import myUnderlines from '../underlines/MyUnderlinesReducer';
import search from '../search/SearchReducer';


const reducers = combineReducers({
  books, bookDetail, underlines, search, myUnderlines
});

export default reducers;
