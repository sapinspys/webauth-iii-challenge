import React from 'react';
import axios from 'axios';

import requiresAuth from '../../auth/requiresAuth.js'

class Users extends React.Component {
  state ={
    users: [],
  }

  render() {
    return (
      <div>
      <h3>User List</h3>
      <ul>
        {this.state.users.map((user,index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
      </div>
    )
  }

  componentDidMount() {
    axios
      .get('/users')
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(error => {
        console.log('ERROR', error)
      })
  }
}

export default requiresAuth(Users);