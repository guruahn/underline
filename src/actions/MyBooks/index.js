import * as types from './ActionTypes'

// 액션 생성자, 함수 이름 규칙은 camelCase

export function setMyBooks (books){
  return {
    type: types.SET_MY_BOOKS,
    books
  };
}

export function addBook (book, id){
  return {
    type: types.ADD_BOOK,
    id,
    book
  }
}
