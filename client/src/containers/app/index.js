import React from 'react'
import { Route, Link, Switch, Redirect} from 'react-router-dom'

import Home from '../home'
// import Register from '../register'
import Login from '../login'

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

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      &nbsp;&#124;&nbsp;
      <Link to="/login">Login</Link>
      {/* <button onClick={this.logout}>Logout</button> */}
    </header>
    
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/register" component={Register} /> */}
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </div>
  </div>
)

export default App
