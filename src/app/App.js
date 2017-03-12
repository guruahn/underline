import React, { Component } from 'react';
import { Match, BrowserRouter, Miss, Redirect } from 'react-router'
import Login from '../user/Login'
import Register from '../user/Register'
import Home from './Home'
import Search from '../search/Search'
import Header from './Header'
import MyBooks from '../books/MyBooks'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'
//import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';
import Loading from 'react-loading-animation'


import 'bootstrap/dist/css/bootstrap.css'
import '../css/style.css';
import 'bootstrap/dist/js/bootstrap.min.js'


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
      : <Redirect to='/mybooks' />}
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
          {({router}) => (


            <div className="">


              <div className="container">
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
                        router.transitionTo('/mybooks')
                      }
                    }
                  }
                  />
                <div>
                  <Match pattern='/' exactly component={Home} />
                  <MatchWhenUnauthed authed={this.state.authed} pattern='/login' component={Login} />
                  <MatchWhenUnauthed authed={this.state.authed} pattern='/register' component={Register} />
                  <MatchWhenAuthed authed={this.state.authed} pattern='/mybooks' component={MyBooks} />
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