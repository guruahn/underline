import * as types from '../actions/MyBooks/ActionTypes';

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
      case types.SEARCH_LIST:
        return {
          ...state, searchBooks: action.books
        }
        break;
      default:
        return state;

    }

}
