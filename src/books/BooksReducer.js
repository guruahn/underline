import * as types from './BooksActionTypes';

const initialState = {
  keyword: '',
  books: [],
  searchBooks: []
};

export default function myBooks(state = initialState, action){
    switch (action.type) {
      case types.INSERT_KEYWORD:
        return { ...state, keyword: action.keyword};
        break;
      case types.SET_MY_BOOKS:
        return {
          books: action.books
        }
        break;
      case types.ADD_BOOK:
        console.log(action.book)
        return {
          ...state, books: [
              ...state.books,
              {
                key: action.book.key,
                value: action.book.value
              }
            ]
          }
        break;
      case types.REMOVE_BOOK:
        return {
          ...state, books: [
            ...state.books.filter(book => action.book.key !== book.key)
          ]
        }
        break;
      case types.ON_ING:
        return {
          ...state, books: [
            ...state.books.map(
              book => book.key === action.book.key ? {...book, ing: true} : book)
          ]
        }
        break;
      case types.SEARCH_LIST:
        return {
          ...state, searchBooks: action.books
        }
        break;
      default:
        return state;

    }

}
