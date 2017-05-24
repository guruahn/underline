import React from 'react';
import ReactDOM from 'react-dom';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';

import { PureMyBooks } from '../MyBooks';
import user from '../../config/authInfoForTest';


describe('<MyBooks />', () => {
  it('[shallow] renders without crashing', () => {
    //console.log(MyUnderlinesStore)
    const wrapper = shallow(<PureMyBooks user={user} auth={true} />);
    //console.log(wrapper.debug())

  });
});
