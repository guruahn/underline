import React, { Component } from 'react';
import { auth } from '../helpers/auth';

export default class Register extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    auth(this.email.value, this.pw.value);
  }
  render () {
    let form = null;
    if(false){
      form = (

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>

      );
    }
    return (
      <div className="u-maxWidth700 u-marginAuto">
        <h1>Register</h1>
        <p>This is Underline Beta. <a href="mailto:guruahn@gmail.com" target="_top">Give me a email</a> if you want to join Underline.</p>
        {form}
      </div>
    )
  }
}
