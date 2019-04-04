import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'


// import { login } from '../../modules/login.js'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 2rem;
    margin: 15px 0;
  }

  label {
    margin-bottom: 10px;
    font-size: 1.5rem;
  }

  input {
    margin-bottom: 15px;
    padding: 5px 0;
    background: lightgray;
    font-size: 1.2rem;
    text-align: center;
  }

  button {
    padding: 6px 24px;
    font-weight: bold;
    font-size: 1.5rem;
    margin: 15px 0;
    border-radius: 5px;
    background: lightgray;
    color: black;
    border: none;
    box-shadow: 4px 4px 0 gray;
    transition: 0.15s;

    &:hover {
      transform: scale(1.05)
    }
  }
`;

// INLINE COMPONENTS (FOR TOGGLING)
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
      <StyledForm onSubmit={this.handleSubmit}>
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
              Submit
            </button>
          )}

          {/* <button onClick={this.handleSignUp} className="register-btn">
            Register
          </button> */}
        </div>

        <label style={loginError(this.props.error)}>
          Error: {this.props.error}. Please try again.
        </label>
      </StyledForm>
    );
  }
  
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // WITH REDUX
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

  // W/O REDUX
  handleSubmit = event => {
    event.preventDefault();
    axios.put('http://localhost:5000/api/auth/login', this.state)
      .then(res => {
        console.log('LOGIN SUCCESSFUL', res.data)
        localStorage.setItem('token', res.data.token);
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error)
      })

    
    this.setState({
      password: ""
    });
  }

  // handleSignUp = event => {
  //   event.preventDefault();
  //   this.props.history.push("/signup");
  // };
}

// const mapStateToProps = state => ({
//   loggingIn: state.login.loggingIn,
//   currentUser: state.login.currentUser,
//   status: state.login.status,
//   error: state.login.error
// })

// export default connect(
//   mapStateToProps,
//   { login }
// )(LoginForm);

export default withRouter(LoginForm);