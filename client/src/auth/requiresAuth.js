import React from 'react';
import axios from 'axios';

axios.interceptors.request.use(function(requestConfig) {
  const token = localStorage.getItem('token');
  requestConfig.headers.authorization = token;
  return requestConfig
})

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem('token');
      const notLoggedIn = <h3>Please log in to see users</h3>
      // return axios.create({ headers: { authorization: token } })
      return <div>{token ? <Component {...this.props} /> : notLoggedIn}</div>
    }
  }
};