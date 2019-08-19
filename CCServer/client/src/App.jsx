import React from 'react';
import './App.css';
import { Link, Route, withRouter } from 'react-router-dom';
import { getMatches } from './services/api-helper';
import ProfileIcon from './assets/ProfileIcon.png';
import HomeIcon from './assets/HomeIcon.png';
import MatchesIcon from './assets/MatchesIcon.png';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Profile from './components/Profile';
import Contact from './components/Contact';
import decode from 'jwt-decode';

import {
  loginUser,
} from './services/api-helper'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      mutualMatchIDs: [],
      loginError: false
    }
  }
  //Match functions
  getMutuals = async (id) => {
    const matches = await getMatches(id);
    const mutuals = []
    matches.forEach(m => {
      m.matches.forEach(i => {
        if (i.id === id) {
          mutuals.push(m.id);
        }
      });
    });
    return mutuals;
  };

  addMutual = (id) => {
    this.setState(prevState => ({
      mutualMatchIDs: [...prevState.mutualMatchIDs, id]
    }));
  }
  //CDM
  componentDidMount = async () => {
    const token = localStorage.getItem('jwt');
    let currentUser;
    if (token) {
      currentUser = decode(token)
    }
    if (currentUser) {
      this.setState({
        currentUser: currentUser
      });
      const mutuals = await this.getMutuals(currentUser.user_id);
      this.setState(prevState => ({
        mutualMatchIDs: [...prevState.mutualMatchIDs, ...mutuals]
      }));
    };
  };

  //Travel Methods
  goToProfile = () => {
    this.props.history.push('/profile');
  };
  goToCards = () => {
    this.props.history.push('/home');
  };
  goToContact = () => {
    this.props.history.push('/contact')
  }

  //Auth Section

  handleLogin = async (formData) => {
    try {
      const userData = await loginUser(formData);
      const currentUser = decode(userData.token)
      this.setState({
        currentUser: currentUser
      })
      localStorage.setItem('jwt', userData.token)
      const mutuals = await this.getMutuals(currentUser.user_id);
      this.setState(prevState => ({
        mutualMatchIDs: [...prevState.mutualMatchIDs, ...mutuals]
      }));
      if (currentUser.budget) {
        this.props.history.push('/home')
      } else {
        this.props.history.push('/profile')
      }
    } catch (e) {
      console.log(e);
      this.setState({
        loginError: true
      });
    }
  }


  handleLogout = () => {
    localStorage.removeItem('jwt');
    this.setState({
      currentUser: null
    })
    this.props.history.push('/')
  }

  hideLoginAlert = () => {
    this.setState({
      loginError: false
    })
  }

  render() {
    return (
      <div className='App'>
        {this.state.currentUser &&
          <div className="nav-bar">
            <Link to="/profile"><img src={ProfileIcon} /></Link>
            <Link to="/home"><img src={HomeIcon} /></Link>
            <Link to="/contact"><img src={MatchesIcon} /></Link>

          </div>
        }
        <Route exact path='/' render={() => (
          <Welcome
            handleLogin={this.handleLogin}
            loginError={this.state.loginError}
            hideLoginAlert={this.hideLoginAlert}
          />)} />
        <Route path='/home' render={() => (
          <Home addMutual={this.addMutual} />
        )} />
        <Route path='/profile' render={() => (
          <Profile handleLogout={this.handleLogout} />
        )} />
        <Route path='/contact' render={() => (
          <Contact matchIds={this.state.mutualMatchIDs}
            getMutuals={(id) => this.getMutuals(id)} />
        )} />
      </div>
    );
  }
}

export default withRouter(App);
