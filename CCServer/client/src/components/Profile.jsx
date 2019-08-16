import React from 'react'
import { showUser, updateUser } from '../services/api-helper';
import UserForm from './UserForm';
import decode from 'jwt-decode';

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userForm: {
        name: "",
        email: "",
        fave_show_1: "",
        fave_show_2: "",
        fave_show_3: "",
        budget: "",
        profile_pic: ""
      },
      updateResponse: false
    }
  }

  componentDidMount = async () => {
    const token = localStorage.getItem("jwt");
    const userData = decode(token);
    const id = userData.user_id
    const user = await showUser(id);
    for (let [key, value] of Object.entries(user)) {
      if (key !== "created_at" && key !== "password_digest" && key !== "id" && key !== "updated_at") {
        this.setState(prevState => ({
          userForm: {
            ...prevState.userForm,
            [key]: value
          }
        }));
      }
    }
    this.setState({
      user: user,
    })
  };

  handleUserChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      userForm: {
        ...prevState.userForm,
        [name]: value
      },
      updateResponse: false
    }));
  }

  handleUserUpdate = async (e) => {
    e.preventDefault();
    const userData = this.state.userForm
    const id = this.state.user.id
    try {
      const resp = await updateUser(id, userData);
      console.log(resp);
      this.setState({
        updateResponse: true
      });
    } catch (err) {
      console.log(err.response)
      this.setState({
        updateResponse: false
      })
    }
  };
  render() {
    return (
      <div className="profile">
        <h2>Update your profile</h2>
        <UserForm
          userForm={this.state.userForm}
          handleChange={this.handleUserChange}
          handleUpdate={this.handleUserUpdate} />
        {this.state.updateResponse &&
          <p>Your profile has been updated!</p>}
        <div id="logout">
          <button className="logout-button" onClick={this.props.handleLogout}>Log Out</button>
        </div>
      </div>
    )
  }
}

export default Profile
