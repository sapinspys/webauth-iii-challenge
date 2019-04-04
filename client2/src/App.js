import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

// import logo from './logo.svg';
import './App.css';

import Login from './components/Login.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </header>
        
        <>
          <Route exact path='/' component = {Home} />
          <Route path='/login' component = {Login} />
        </>
      </div>
    );
  }
}

const Home = props => (
  <div>Hello world</div>
)

export default App;
