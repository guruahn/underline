import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom'

import './style/Header.css'

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      popoverState: false
    }
    this.onPop = this.onPop.bind(this);
  }

  onPop(nextPopState = !this.state.popoverState){
    this.setState({ popoverState: nextPopState});
  }

  componentWillMount() {
    // add event listener for clicks
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    // make sure you remove the listener when the component is destroyed
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick = e => {
    if(!ReactDOM.findDOMNode(this).contains(e.target)) {
      // the click was outside your component, so handle closing here
      this.onPop(false);
    }
  }

  render() {
    let popover = null;
    if(this.state.popoverState){
      popover = <div className="header-popover js-header-popover u-zIndexTop">
        <div className="header-popover__inner">
          <ul className="">
            <li className="header-menu"><Link to="/search" >Book Search</Link></li>
            <li className="header-menu"><Link to="/myUnderlines" >My Underlines</Link></li>
            <li className="header-menu"><Link to="/myBooks" >My Books</Link></li>
            <li className="header-menu">
              <Link
                to="#"
                className={this.props.auth ? '' : 'hide'}
                onClick={this.props.onLogout}>
                Logout
              </Link>
            </li>
            <li className="header-menu"><Link to="/login" className={this.props.auth ? 'hide' : ''} >Login</Link></li>
            <li className="header-menu"><Link to="/register" >Register</Link></li>
          </ul>
        </div>
      </div>
    }
    return(
      <div>
        <nav className={"header u-fixed u-boxShadowBottomThinLighter u-zIndexTop"}>
          <div className={"header__inner u-maxWidth1000 u-marginAuto"}>
            <div className={"header-block header-block__brand u-floatLeft"}>
              <Link to="/" className="">Underline</Link>
            </div>{ /*.header-block*/ }
            <div className="header-block header-block__menus u-floatRight">
              <div className="header-menu u-inlineBlock">
                <Link to="/addUnderline" replace >Write a underline</Link>
              </div>
              <div className="header-menu u-inlineBlock">
                <Link
                  to="#"
                  replace
                  onClick={() => this.onPop()}
                  className="js-popover">More</Link>
                {popover}
              </div>
              <div className="header-menu u-inlineBlock">
                <Link to="#" className="navbar-link">{this.props.user.email}</Link>
              </div>
            </div>{ /*.header-block*/ }

          </div>
        </nav>

      </div>
    );
  }
}
export default Header;
