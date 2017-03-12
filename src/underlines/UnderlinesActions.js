import * as types from './UnderlinesActionTypes';



// 액션 생성자, 함수 이름 규칙은 camelCase

export function setMyUnderlines (underline){
  return {
    type: types.SET_MY_UNDERLINES,
    underline
  };
}

export function selecBook (book) {
  return {
    type: types.SELECT_BOOK,
    book
  }
}

export function addUnerline (line, id){
  return {
    type: types.ADD_UNDERLINE,
    id,
    line
  }
}

export function removeLine (line){
  return {
    type: types.REMOVE_LINE,
    line
  }
}

export function toggleIsWritingLine (){
  return {
    type: types.TOGGLE_IS_WRITING_LINE
  }
}

export function setSearchBookList (books){
  return {
    type: types.SET_SEARCH_BOOK_LIST,
    books
  }
}
