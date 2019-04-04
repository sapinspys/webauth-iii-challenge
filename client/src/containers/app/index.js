import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Switch, Redirect} from 'react-router'

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
