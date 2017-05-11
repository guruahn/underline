import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';

import { createStore } from 'redux';
import reducers from './app/reducer';

import { Provider } from 'react-redux';

//const store = createStore(reducers);
const store = createStore(
   reducers, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
