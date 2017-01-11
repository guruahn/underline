import * as types from '../actions/ActionTypes';

const initialState = {
  keyword: '',
  book: []
};

export default function counter(state = initialState, action){
    switch (action.type) {
      case types.INSERT_KEYWORD:
        return { ...state, keyword: action.keyword};
        break;
      case types.ADD_BOOK:
        return [
          {
            id: 1,
            book: action.book
          },
          ...state
        ]
        break;
      default:
        return state;

    }

}
