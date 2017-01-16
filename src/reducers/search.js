import * as types from '../actions/ActionTypes';

const initialState = {
  keyword: '',
  books: []
};

export default function counter(state = initialState, action){
    switch (action.type) {
      case types.INSERT_KEYWORD:
        return { ...state, keyword: action.keyword};
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
