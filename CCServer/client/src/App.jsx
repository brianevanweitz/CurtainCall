import React from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import Welcome from './components/Welcome';
import Home from './components/Home'
import decode from 'jwt-decode';

import {
  loginUser,
} from './services/api-helper'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    }
  }

  //Auth Section

  handleLogin = async (formData) => {
    const userData = await loginUser(formData);
    this.setState({
      currentUser: decode(userData.token)
    })
    localStorage.setItem("jwt", userData.token)
    this.props.history.push("/home")
  }

  handleLogout = () => {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null
    })
    this.props.history.push("/")
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <Welcome
            handleLogin={this.handleLogin}
          />)} />
        <Route path="/home" render={() => (
          <Home />
        )} />
      </div>
    );
  }
}

export default withRouter(App);
