import React from 'react'
import Axios from 'axios'

import requiresAuth from '../auth/requiresAuth.js'

class Home extends React.Component {
  state ={
    users: [],
  }

  render() {
    return (
      <div>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map((user,index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      </div>
    )
  }

  componentDidMount() {
    Axios
      .get('/users')
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(error => {
        console.log(error)
        // this.setState({
        //   error: error
        // });
      })
  }
}

export default requiresAuth(Home);