import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../App';

it('[shallow] renders without crashing', () => {
  shallow(<App />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
