import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';

import { createStore } from 'redux';
import reducers from './app/reducer';

import { Provider } from 'react-redux';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
