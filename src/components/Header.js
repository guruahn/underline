import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import 'bootstrap/dist/css/bootstrap.css'
import Search from './Search'

const propTypes = {
};
const defaultProps = {
};
class Header extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
      this.props.onLogin()
    }
    render() {
        return(
            <div className={"row"}>
              <nav className={"navbar navbar-default"}>
                <div className={"container-fluid"}>
                  <div className={"navbar-header"}>
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
Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
export default Header;
