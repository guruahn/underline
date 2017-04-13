import * as types from './SearchActionTypes';

const initialState = {
  keyword: '',
  searchBooks: [],
  underline: ''
};

export default function search(state = initialState, action){
    switch (action.type) {
      case types.INSERT_KEYWORD:
        return { ...state, keyword: action.keyword};
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
      case types.ON_ING:
        return {
          ...state, books: [
            ...state.books.map(
              book => book.key === action.book.key ? {...book, ing: true} : book)
          ]
        }
      case types.SEARCH_LIST:
        return {
          ...state, searchBooks: action.books
        }
      case types.SET_UNDERLINE:
        console.log('set underline', action.underline)
        return {
          ...state, underline: action.underline
        }
      default:
        return state;

    }

}
