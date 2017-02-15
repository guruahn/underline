import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Match, BrowserRouter, Miss, Redirect } from 'react-router'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Search from './Search'
import Header from './Header'
import Dashboard from './protected/Dashboard'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'

import '../css/style.css';

function MatchWhenAuthed ({component: Component, authed, ...rest}) {
  return (
    <Match
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function MatchWhenUnauthed ({component: Component, authed, ...rest}) {
  return (
    <Match
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
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
    console.log(this.state)
  }
  componentWillUnmount () {
    this.removeListener()
  }



  render() {

    return this.state.loading === true ? <h1>Loading</h1> : (
      <div>
        <BrowserRouter>
          {({router}) => (


            <div className="">
              <Header
                auth={this.state.authed}
                user={this.state.user}
                onLogout={() =>{
                    logout()
                    this.setState({authed: false, user:''})
                    router.transitionTo('/')
                }}
                onLogin={() =>{
                    if(this.state.authed){
                      router.transitionTo('/dashboard')
                    }
                  }
                }
                />

              <div className="container">
                <div className="row">
                  <Match pattern='/' exactly component={Home} />
                  <MatchWhenUnauthed authed={this.state.authed} pattern='/login' component={Login} />
                  <MatchWhenUnauthed authed={this.state.authed} pattern='/register' component={Register} />
                  <MatchWhenAuthed authed={this.state.authed} pattern='/dashboard' component={Dashboard} />
                  <MatchWhenAuthed authed={this.state.authed} pattern='/search' component={Search} />
                  <Miss render={() => <h3>No Match</h3>} />
                </div>
              </div>
            </div>
          )}
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
