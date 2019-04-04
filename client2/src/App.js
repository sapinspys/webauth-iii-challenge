import React, { Component } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';

import LoginForm from './components/LoginForm.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <button onClick={this.logout}>Logout</button> */}
          <Link className='App-link' to="/">Home</Link>
          &nbsp;&#124;&nbsp;
          <Link className='App-link' to="/login">Login</Link>
          &nbsp;&#124;&nbsp;
          <Link className='App-link' to="/Register">Register</Link>
        </header>
        
        <>
          <PrivateRoute exact path='/' component={Home} />
          <Route path='/login' component={LoginForm} />
        </>
      </div>
    );
  }
}

const Home = props => (
  <div>Hello world</div>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

export default App;
