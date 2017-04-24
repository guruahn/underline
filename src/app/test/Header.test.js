import React from 'react';
import ReactDOM from 'react-dom';
import { expect, assert } from 'chai';
import { shallow } from 'enzyme';

import Header from '../Header';
import user from '../../config/authInfoForTest.js';

describe('<Header />', () => {
  it('[shallow] renders without crashing', () => {
    const wrapper = shallow(<Header user={user} auth={true} />);
  });
  it('[shallow] popoverState init value should false' , () => {
    const wrapper = shallow(<Header user={user} auth={true} />);
    assert.equal(wrapper.state().popoverState,false);
  });
  it('simulates click more link', () => {
    const wrapper = shallow(
      <Header user={user} auth={true} />
    );
    wrapper.find('.js-popover').simulate('click');
    assert.equal(wrapper.state().popoverState,true);
    wrapper.find('.js-popover').simulate('click');
    assert.equal(wrapper.state().popoverState,false);
  });
});
