import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { login } from '../../modules/login.js'

// INLINE COMPONENTS (TOGGLING)
const loginError = toggleFlag => {
  return {
    color: "red",
    fontSize: "0.9rem",
    display: toggleFlag ? "block" : "none",
    marginTop: "25px"
  };
};

export class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>
          Login
        </h2>

        <label htmlFor="username">Username</label>
        <input
          onChange={this.handleChange}
          name="username"
          type="text"
          value={this.state.username}
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={this.handleChange}
          name="password"
          type="password"
          value={this.state.password}
          className="last-input"
        />

        <div>
          {this.props.loggingIn ? (
            <h3>Logging in.... please wait...</h3>
          ) : (
            <button type="submit" className="login-btn">
              Login
            </button>
          )}

          <button onClick={this.handleSignUp} className="register-btn">
            Register
          </button>
        </div>

        <label style={loginError(this.props.error)}>
          Error: {this.props.error}. Please try again.
        </label>
      </form>
    );
  }
  
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   this.props.login(this.state.username, this.state.password, () =>
  //     this.props.history.push("/")
  //   );

  //   this.setState({
  //     username: "",
  //     password: ""
  //   });
  // };

  handleSubmit = event => {
    event.preventDefault();
    axios.put('http://localhost:5000/api/auth/login', this.state)
      .then(res => {
        console.log('LOGIN RESPONSE', res.data)
        localStorage.setItem('token', res.data.token);
      })
      .catch(error => {
        console.log('ERROR', error)
      })
  }

  handleSignUp = event => {
    event.preventDefault();
    this.props.history.push("/signup");
  };
}

const mapStateToProps = state => ({
  loggingIn: state.login.loggingIn,
  currentUser: state.login.currentUser,
  status: state.login.status,
  error: state.login.error
})

export default connect(
  mapStateToProps,
  { login }
)(LoginForm);