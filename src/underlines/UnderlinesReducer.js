import * as types from './UnderlinesActionTypes';

const initialState = {
  underline: '',
  underlines: [],
  searchBooks: [],
  isSearchingBook: false,
  selectedBook: {},
  isWritingLine: false
};

export default function underlines(state = initialState, action){
    switch (action.type) {
      case types.SET_MY_UNDERLINES:
        console.log(action.underline)
        return {
          ...state,
          underline: action.underline
        }
      case types.SELECT_BOOK:
        return {
          ...state,
          selectedBook: action.book
        }
      case types.ADD_UNDERLINE:
        console.log(action.underlines)
        return {
          ...state, underlines: [
              ...state.underlines,
              {
                key: action.underline.key,
                value: action.underline.value,
                bookKey: action.book.key
              }
            ]
          }
      case types.REMOVE_UNDERLINE:
        return {
          ...state, underlines: [
            ...state.underlines.filter(underline => action.underline.key !== underline.key)
          ]
        }
      case types.TOGGLE_IS_WRITING_LINE:
        return {
          ...state,
          isWritingLine: !state.isWritingLine
        }
      case types.TOGGLE_IS_SEARCHING:
        return {
          ...state,
          isSearching: !state.isSearching
        }
      default:
        return state;

    }

}
