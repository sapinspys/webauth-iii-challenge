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

export class Login extends React.Component {
  state = {
    inputEmail: "",
    inputPassword: ""
  };

  onEmailChange = event => {
    this.setState({ inputEmail: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ inputPassword: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state.inputEmail, this.state.inputPassword, () =>
      this.props.history.push("/")
    );

    this.setState({
      inputEmail: "",
      inputPassword: ""
    });
  };

  handleSignUp = event => {
    event.preventDefault();
    this.props.history.push("/signup");
  };

  render() {
    return (
      <StyledLoginForm onSubmit={this.handleSubmit}>
        <h2>
          <i className="fas fa-globe-americas fa-md o-brand" /> Mentor Login
        </h2>

        <label htmlFor="email">Email</label>
        <input
          onChange={this.onEmailChange}
          name="email"
          type="email"
          value={this.state.inputEmail}
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={this.onPasswordChange}
          name="password"
          type="password"
          value={this.state.inputPassword}
          className="last-input"
        />

        <ButtonContainer>
          {this.props.loggingIn ? (
            <Spinner size="6px" color="#17BCFF" />
          ) : (
            <button type="submit" className="login-btn">
              Login
            </button>
          )}

          <button onClick={this.handleSignUp} className="signup-btn">
            Signup
          </button>
        </ButtonContainer>

        <label style={loginError(this.props.error)}>
          Error: {this.props.error}. Please try again.
        </label>
      </StyledLoginForm>
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