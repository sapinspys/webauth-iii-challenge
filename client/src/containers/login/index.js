import React from 'react'
import { connect } from 'react-redux'

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

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password, () =>
      this.props.history.push("/")
    );

    this.setState({
      username: "",
      password: ""
    });
  };

  handleSignUp = event => {
    event.preventDefault();
    this.props.history.push("/signup");
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
          type="username"
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