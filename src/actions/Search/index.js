import * as types from './ActionTypes'

// 액션 생성자, 함수 이름 규칙은 camelCase

export function insertKeyword (keyword){
  return {
    type: types.INSERT_KEYWORD,
    keyword
  }
}

export function addBook (book, id){
  return {
    type: types.ADD_BOOK,
    id,
    book
  }
}

export function setBooks (books){
  return {
    type: types.SET_BOOKS,
    books
  };
}
