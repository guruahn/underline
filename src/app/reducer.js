import { combineReducers } from 'redux';
import myBooks from '../books/BooksReducer';
import underlines from '../underlines/UnderlinesReducer';

const reducers = combineReducers({
  myBooks, underlines
});

export default reducers;
