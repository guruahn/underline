import React, { Component } from 'react';
import { firebaseAuth } from '../config/constants';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.user = firebaseAuth().currentUser;
  }

  render () {

    return (
      <div className="u-maxWidth700 u-marginAuto">
        This is Underline Beta. <a href="mailto:guruahn@gmail.com" target="_top">Give me a email</a> if you want to join Underline.
      </div>
    )
  }
}
