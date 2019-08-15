import React from 'react'
import Login from './Login'
import Register from './Register'
import { registerUser } from '../services/api-helper';

class Welcome extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      form: true,
      loginForm: {
        email: "",
        password: ""
      },
      registerForm: {
        name: "",
        email: "",
        password: ""
      }
    }
  }

  registerChange = () => {
    this.setState({
      form: false
    })
  }
  loginChange = () => {
    this.setState({
      form: true
    })
  }

  loginHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      loginForm: {
        ...prevState.loginForm,
        [name]: value
      }
    }));
  }

  registerHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      registerForm: {
        ...prevState.registerForm,
        [name]: value
      }
    }));
  }

  handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(this.state.registerForm);
    this.props.handleLogin(this.state.registerForm);
  }
  render() {
    return (
      <div className="welcome">
        <div className="title-bar">
          <h1>Curtain Call</h1>
        </div>
        {this.state.form &&
          <Login
            handleLogin={this.props.handleLogin}
            handleChange={this.loginHandleChange}
            loginForm={this.state.loginForm}
            registerChange={this.registerChange} />}
        {!this.state.form &&
          <Register
            handleRegister={this.handleRegister}
            handleChange={this.registerHandleChange}
            registerForm={this.state.registerForm}
            loginChange={this.loginChange} />}

        <footer className="logo-credit">
          <div>Logo made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
        </footer>
      </div>
    )
  }
}

export default Welcome
