import * as types from './BooksActionTypes';

const initialState = {
  keyword: '',
  books: [],
  searchBooks: [],
};

export default function books(state = initialState, action){
    switch (action.type) {
      case types.SET_MY_BOOKS:
        return { books: action.books }
      case types.REMOVE_BOOK:
        return {
          ...state, books: [
            ...state.books.filter(book => action.book.key !== book.key)
          ]
        }
      default:
        return state;

    }

}
