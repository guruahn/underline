import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';

import Underline from '../Underline';
import user from '../../config/authInfoForTest';
import { dummy } from './MyUnderlines.dummy';



describe('<Underline />', () => {

  //공통
  const props = {
    "underline":dummy.underline
  }

  it('[shallow] renders without crashing', () => {

    const wrapper = shallow(<Underline {...props} />);

  });

  it('Underline 렌더하면 링크가 하나 있어야 한다', () => {
    //given
    //when
    const wrapper = shallow(<Underline {...props}/> );
    //console.log(wrapper.debug())
    //then
    expect(wrapper.find('[data-name="book-link"]')).to.have.length(1);
    //expect(title).to.equal("My Underlines");
  });

  it('Underline 렌더하면 fromNow가 하나 있어야 한다.', () => {
    //given
    //when
    const wrapper = shallow( <Underline {...props}/> );
    console.log(wrapper.debug())
    //then
    expect(wrapper.find('[data-name="fromNow"]')).to.have.length(1);
  });
});
