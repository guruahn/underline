import * as types from '../actions/ActionTypes';

const initialState = {
  number: 0
};

export default function counter(state = initialState, action){
    switch (action.type) {
      case types.INCREMENT:
        return { ...state, number: state.number + 1};
        break;
      case types.DECREMENT:
        return { ...state, number: state.number - 1};
      default:
        return state;

    }

}
