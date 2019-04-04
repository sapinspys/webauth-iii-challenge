import React from 'react';
import axios from 'axios';

import requiresAuth from '../auth/requiresAuth'

class Users extends React.Component {
  state ={
    users: [],
  }

  render() {
    return (
      <div>
      <h3>User List</h3>
      <ul>
        {this.state.users.map((user,index) => {
          <li key={index}>{user.username}</li>
        })}
      </ul>
      </div>
    )
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: {
        authorization: token,
      }
    }
    axios.get('http://localhost:5000/api/auth/login', requestOptions)
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(error => {
        console.log('ERROR', error)
      })
  }
}

export default Users;