import { combineReducers } from 'redux';
import counter from './counter';
import search from './search';
import ui from './ui';

const reducers = combineReducers({
  counter, ui, search
});

export default reducers;
