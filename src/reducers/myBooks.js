import * as types from '../actions/MyBooks/ActionTypes';

const initialState = {
  books: []
};

export default function myBooks(state = initialState, action){
    switch (action.type) {
      case types.SET_MY_BOOKS:
        return {
          books: action.books
        };
        break;
      case types.ADD_BOOK:
        console.log(state)
        console.log(action)
        return {
          ...state, books: [
              ...state.books,
              {
                id: Math.max(0, ...state.books.map(b => b.id)) + 1,
                book: action.book
              }
            ]
          }
        break;
      default:
        return state;

    }

}
