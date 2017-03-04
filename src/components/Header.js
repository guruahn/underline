import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Search from './Search'

class Header extends Component {

    componentDidMount(){
      this.props.onLogin()
    }
    render() {
        return(
            <div>
              <nav className={"navbar navbar-default"}>
                <div className={"container-fluid"}>
                  <div className={"navbar-header"}>
                    <button type="button" className={"navbar-toggle collapsed"} data-toggle={"collapse"} data-target={"#bs-example-navbar-collapse-1"} aria-expanded={"false"}>
                      <span className={"glyphicon glyphicon-option-vertical" } aria-hidden={"true"}></span>
                    </button>
                    <a className={"navbar-brand"} href="/">Underline</a>
                  </div>
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                    <Search />
                    <ul className="nav navbar-nav navbar-right">
                      <li><a href="/dashboard">Dashboard</a></li>
                      <li>
                        <a
                          href="#"
                          className={this.props.auth ? '' : 'hide'}
                          onClick={this.props.onLogout}>Logout</a>
                      </li>
                      <li><a href="/login" className={this.props.auth ? 'hide' : ''}>Login</a></li>
                      <li><a href="/register">Register</a></li>
                      <li><a href="#" className="navbar-link">{this.props.user.email}</a></li>
                    </ul>
                  </div>
                </div>
              </nav>

            </div>
        );
    }
}
export default Header;
