import * as types from './SearchActionTypes';



// 액션 생성자, 함수 이름 규칙은 camelCase

export function setUnderline (underline){
  return {
    type: types.SET_UNDERLINE,
    underline
  }
}

export function searchList (books){
  return {
    type: types.SEARCH_LIST,
    books
  }
}

export function addBook (book, id){
  return {
    type: types.ADD_BOOK,
    id,
    book
  }
}

export function insertKeyword (keyword){
  return {
    type: types.INSERT_KEYWORD,
    keyword
  }
}

export function onIng (book){
  return {
    type: types.ON_ING,
    book
  }
}
