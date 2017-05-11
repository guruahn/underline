import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { database, firebaseAuth } from '../../config/constants'
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

const init = () => {
  //console.log('user', user)
  database.ref('/user-underlines/').set(null).then(function(){
    console.log('set null')
  }, function(error){
    console.log("Error updating data:", error);
  });
}

init();


describe('<MyUnderlines />', () => {
  it('[shallow] renders without crashing', () => {
    //console.log(MyUnderlinesStore)
    const wrapper = shallow(<PureMyUnderlines user={user} auth={true} store={MyUnderlinesStore} />);
    //console.log(wrapper.debug())

  });
  it('calls componentDidMount', () => {
    sinon.spy(PureMyUnderlines.prototype, 'componentDidMount');
    const wrapper = mount(<PureMyUnderlines user={user} auth={true} store={MyUnderlinesStore}  />);
    expect(PureMyUnderlines.prototype.componentDidMount.calledOnce).to.equal(true);
  });
  it('[shallow] Underlines length is', () => {
    //console.log('user', typeof user);
    //console.log('dummy', dummy.underlines);
    const props = {
      user: user,
      auth: true,
    }
    const wrapper = mount(
      <Provider store={MyUnderlinesStore}>
        <BrowserRouter>
          <Route
            render={(props) => <PureMyUnderlines underlines={dummy.underlines} user={user}/>}
          />
        </BrowserRouter>
      </Provider>
    );
    //wrapper.setState({underlines: [dummy.underlines]})
    //wrapper.setProps({underlines: [dummy.underlines]});
    //wrapper.update();
    //console.log(wrapper.debug())
    //console.log(wrapper.props().store)
    expect(wrapper.find('.Underline').exists()).to.equal(true);
    //expect(wrapper.find(Underline)).to.have.length(1);
  });
});
