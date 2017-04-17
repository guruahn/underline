import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import Login from '../user/Login'
import Register from '../user/Register'
import Home from './Home'
import Search from '../search/Search'
import Header from './Header'
import MyBooks from '../books/MyBooks'
import MyUnderlines from '../underlines/MyUnderlines'
import AddUnderline from '../underlines/AddUnderline'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'
//import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';
import Loading from 'react-loading-animation'


import './Base.css'
import '../css/style.css';
import 'bootstrap/dist/js/bootstrap.min.js'


function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
      : <Redirect to='/myUnderlines' />}
    />
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      loading: true,
      user: ''
    }
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          user: {email: user.email}
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })
    //console.log(this.state)
  }
  componentWillUnmount () {
    this.removeListener()
  }



  render() {

    if (this.state.loading) {

      return <Loading type='balls' color='#F0AD4E' />
    }

    return(
      <div>
        <BrowserRouter>
          <div className="">
            <div className="container">
              <Header
                auth={this.state.authed}
                user={this.state.user}
                onLogout={() =>{
                    logout()
                    this.setState({authed: false, user:''})
                }}
                />
              <div>
                <Switch>
                  <Route path='/' exact component={Home} />
                  <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                  <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                  <PrivateRoute authed={this.state.authed} path='/mybooks' component={MyBooks} />
                  <PrivateRoute authed={this.state.authed} path='/search/:underlineKey' component={Search} />
                  <PrivateRoute authed={this.state.authed} path='/myUnderlines' component={MyUnderlines} />
                  <PrivateRoute authed={this.state.authed} path='/addUnderline' component={AddUnderline} />
                  <Route render={() => <h3>No Match</h3>} />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );


  }
}
export default App;
