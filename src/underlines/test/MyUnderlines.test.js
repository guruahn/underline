import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';

import {PureMyUnderlines} from '../MyUnderlines';
import Underline from '../Underline';
import user from '../../config/authInfoForTest';
import { MyUnderlinesStore } from './MyUnderlines.store';
import { dummy } from './MyUnderlines.dummy';

import { createStore } from 'redux';
import reducers from '../../app/reducer';

const store = createStore(reducers);


describe('<MyUnderlines />', () => {

  //공통
  const props = {
    "user": user,
    "auth": true,
    "store": MyUnderlinesStore,
    "underlines":dummy.underlines
  }

  it('[shallow] renders without crashing', () => {
    //console.log(MyUnderlinesStore)
    const wrapper = shallow(<PureMyUnderlines {...props} />);
    //console.log(wrapper.debug())

  });
  // it('calls componentDidMount', () => {
  //   sinon.spy(PureMyUnderlines.prototype, 'componentDidMount');
  //   const wrapper = mount(<PureMyUnderlines {...props}  />);
  //   expect(PureMyUnderlines.prototype.componentDidMount.calledOnce).to.equal(true);
  // });
  it('MyUnderlines 렌더하면 페이지 제목이 "MyUnderlines" 여야 한다', () => {
    //given
    //when
    const wrapper = shallow( <PureMyUnderlines {...props}/> );
    //console.log(wrapper.debug())
    //then
    const title = wrapper.find('h1').text();
    expect(title).to.equal("My Underlines");
  });
  // it('Underlines length is 2', () => {
  //   //given
  //   //when
  //   const wrapper = mount( <PureMyUnderlines {...props}/> );
  //   console.log(wrapper.debug())
  //   //then
  //   expect(wrapper.find('[data-name="item"]')).to.have.length(3);
  // });
});
