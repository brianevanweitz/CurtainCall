import React from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Profile from './components/Profile';
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

  componentDidMount = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.setState({
        currentUser: decode(token)
      });
    }
  };

  //Travel Methods
  goToProfile = () => {
    this.props.history.push('/profile');
  }
  goToCards = () => {
    this.props.history.push('/home');
  }

  //Auth Section

  handleLogin = async (formData) => {
    const userData = await loginUser(formData);
    this.setState({
      currentUser: decode(userData.token)
    })
    localStorage.setItem('jwt', userData.token)
    if (this.state.currentUser.budget) {
      this.props.history.push('/home')
    } else {
      this.props.history.push('/profile')
    }
  }

  handleLogout = () => {
    localStorage.removeItem('jwt');
    this.setState({
      currentUser: null
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div className='App'>
        {this.state.currentUser &&
          <header>
            <button onClick={this.goToProfile}>Profile</button>
            <button onClick={this.goToCards}>Find Matches</button>
            <button onClick={this.handleLogout}>Log Out</button>
          </header>
        }
        <Route exact path='/' render={() => (
          <Welcome
            handleLogin={this.handleLogin}
          />)} />
        <Route path='/home' render={() => (
          <Home />
        )} />
        <Route path='/profile' render={() => (
          <Profile />
        )} />
      </div>
    );
  }
}

export default withRouter(App);
