import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Header from '../Header';
import user from '../../config/authInfoForTest.js';

it('[shallow] renders without crashing', () => {
  shallow(<Header />);
});
