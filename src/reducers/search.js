import * as types from '../actions/ActionTypes';

const initialState = {
  keyword: ''
};

export default function counter(state = initialState, action){
    switch (action.type) {
      case types.INSERT_KEYWORD:
        return { ...state, keyword: action.keyword};
        break;
      default:
        return state;

    }

}
