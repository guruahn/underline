import React, { Component } from 'react'
import { firebaseAuth } from '../config/constants';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.user = firebaseAuth().currentUser;
  }

  render () {

    return (
      <div>
        Home. Not Protected. Anyone can see this. authed? {this.props.authed}
      </div>
    )
  }
}
