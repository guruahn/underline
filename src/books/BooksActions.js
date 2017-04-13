import * as types from './BooksActionTypes';



// 액션 생성자, 함수 이름 규칙은 camelCase

export function setMyBooks (books){
  return {
    type: types.SET_MY_BOOKS,
    books
  };
}

export function setBook (book){
  return {
    type: types.SET_BOOK,
    book
  }
}

export function setUnderlinesOfBook (underlines){
  return {
    type: types.SET_UNDERLINE_OF_BOOK,
    underlines
  }
}

export function removeBook (book){
  return {
    type: types.REMOVE_BOOK,
    book
  }
}
