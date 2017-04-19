import * as types from './BooksActionTypes';

const initialState = {
  bookDetail: '',
  underlinesOfBook: []
};

export default function bookDetail(state = initialState, action){
    switch (action.type) {
      case types.SET_BOOK:
        return { ...state, bookDetail: action.book }
      case types.SET_UNDERLINE_OF_BOOK:
        return { ...state, underlinesOfBook: action.underlines }
      default:
        return state;
    }

}
