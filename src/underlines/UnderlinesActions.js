import * as types from './UnderlinesActionTypes';



// 액션 생성자, 함수 이름 규칙은 camelCase

export function setMyUnderlines (underlines){
  return {
    type: types.SET_MY_UNDERLINES,
    underlines
  };
}

export function setUnderline (underline){
  return {
    type: types.SET_UNDERLINE,
    underline
  }
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

export function toggleIsSearching (){
  return {
    type: types.TOGGLE_IS_SEARCHING
  }
}

export function setSearchBookList (books){
  return {
    type: types.SET_SEARCH_BOOK_LIST,
    books
  }
}
