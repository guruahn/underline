import * as types from './UnderlinesActionTypes';

const initialState = {
  underlines: []
};

export default function myUnderlines(state = initialState, action){
    switch (action.type) {
      case types.SET_MY_UNDERLINES:
        return { ...state, underlines: action.underlines }
      default:
        return state;
    }

}
