import React from 'react'
import Login from './Login'
import Register from './Register'
import logo from '../assets/logo.png'
import SweetAlert from 'react-bootstrap-sweetalert';

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
      },
      registerError: null
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

  // handleRegister = async (e) => {
  //   try {
  //     e.preventDefault();
  //     await registerUser(this.state.registerForm);
  //   } catch (error) {
  //     console.log(error.response.data)
  //     this.setState({
  //       registerError: error.response.data.join('. ')
  //     });
  //   }
  //   this.props.handleLogin(this.state.registerForm);
  // }

  render() {
    return (
      <div className="welcome">
        <div className="title-bar">
          <h1>Curtain </h1>
          <img src={logo} />
          <h1> Call </h1>
        </div>
        <div className="form">
          {this.state.form &&
            <Login
              handleLogin={this.props.handleLogin}
              handleChange={this.loginHandleChange}
              loginForm={this.state.loginForm}
              registerChange={this.registerChange} />}
          {!this.state.form &&
            <Register
              handleRegister={(e) => {
                e.preventDefault();
                this.props.handleRegister(this.state.registerForm);
              }}
              handleChange={this.registerHandleChange}
              registerForm={this.state.registerForm}
              loginChange={this.loginChange} />}
        </div>
        <div id="errors">
          {this.props.registerError && (<SweetAlert
            error
            showCloseButton={true}
            showConfirm={true}
            closeOnClickOutside={true}
            timeout={3000}
            customClass="error"
            title="Error"
            onCancel={(e) => { this.props.hideAlert(e) }}
            onConfirm={(e) => { this.props.hideAlert(e) }}>{this.props.registerError}</SweetAlert>)}
          {!this.props.registerError && this.props.loginError && (<SweetAlert
            error
            showCloseButton={true}
            showConfirm={true}
            closeOnClickOutside={true}
            timeout={3000}
            title="Invalid username or password. Try again."
            onCancel={(e) => { this.props.hideAlert(e) }}
            onConfirm={(e) => { this.props.hideAlert(e) }}></SweetAlert>)}
        </div>
        <footer className="logo-credit">
          <div>Logo made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
        </footer>
      </div>
    )
  }
}

export default Welcome
