import * as types from './BooksActionTypes';



// 액션 생성자, 함수 이름 규칙은 camelCase

export function setMyBooks (books){
  return {
    type: types.SET_MY_BOOKS,
    books
  };
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

export function removeBook (book){
  return {
    type: types.REMOVE_BOOK,
    book
  }
}

export function onIng (book){
  return {
    type: types.ON_ING,
    book
  }
}
