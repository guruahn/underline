import * as types from './ActionTypes'

// 액션 생성자, 함수 이름 규칙은 camelCase
export function increment (){
  return {
    type: types.INCREMENT
  };
}

export function decrement (){
  return {
    type: types.DECREMENT
  };
}

export function setColor (color){
  return {
    type: types.SET_COLOR,
    color
  };
}

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
