import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {

    componentDidMount(){
      //this.props.onLogin()
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
                    <Link to="/" className="navbar-brand">Underline</Link>
                  </div>
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                      <li><Link to="/search" >Book Search</Link></li>
                      <li><Link to="/addUnderline" replace >add underline</Link></li>
                      <li><Link to="/myUnderlines" >My Underlines</Link></li>
                      <li>
                        <Link
                          to="#"
                          className={this.props.auth ? '' : 'hide'}
                          onClick={this.props.onLogout}>
                          Logout
                        </Link>
                      </li>
                      <li><Link to="/login" className={this.props.auth ? 'hide' : ''} >Login</Link></li>
                      <li><Link to="/register" >Register</Link></li>
                      <li><Link to="#" className="navbar-link">{this.props.user.email}</Link></li>
                    </ul>
                  </div>
                </div>
              </nav>

            </div>
        );
    }
}
export default Header;
