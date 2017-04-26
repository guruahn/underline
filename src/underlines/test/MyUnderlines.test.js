import React from 'react';
import ReactDOM from 'react-dom';
import { database, firebaseAuth } from '../../config/constants'
import { expect, assert } from 'chai';
import { shallow } from 'enzyme';

import MyUnderlines from '../MyUnderlines';
import user from '../../config/authInfoForTest.js';

import { createStore } from 'redux';
import reducers from '../../app/reducer';

const store = createStore(reducers);

describe('<MyUnderlines />', () => {
  it('[shallow] renders without crashing', () => {
    const wrapper = shallow(<MyUnderlines user={user} auth={true} store={store} />);
  });
});


const addUnderline = () => {
  const underline = "신부님 본명이 스테파노잖아. 그 이름이 뭘 뜻하냐면 하늘에서 뭘 보는 사람의 이름이라는 거지. 사도행전을 보면, 하느님과 모세에 대해 불경스러운 말을 한다고 해서 최고의회에 끌려가서도 스테파노는 굴하지 않고 그리스도를 메시아로 인정하지 않는 유다인들을 비판해서 최고의회 의원들이 화를 내거든.";
  const updates = {};
  const underlineKey = database.ref().child('underlines').push().key;
  updates['/underlines/' + underlineKey] = { line:underline };
  console.log(updates)
  database.ref().update(updates).then(function() {
    console.log('result addUnderline', JSON.stringify({key:underlineKey,value:underline}));
    addUserLine(underline, underlineKey);
  }, function(error) {
      console.log("Error updating data:", error);
  });
}

const addUserLine = (underline, underlineKey) => {
  const updates = {};
  updates['/user-underlines/' + user.uid + '/' + underlineKey] = { line:underline };
  database.ref().update(updates).then(function() {
    console.log('result addUserLine', JSON.stringify({key:underlineKey,value:underline}));
    //_this.props.history.push('/search/' + underlineKey);
  }, function(error) {
      console.log("Error updating data:", error);
  });
}
