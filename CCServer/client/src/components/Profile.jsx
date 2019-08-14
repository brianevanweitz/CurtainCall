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
      updateResponse: ''
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
    console.log(this.state.userForm);
  };

  handleUserChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      userForm: {
        ...prevState.userForm,
        [name]: value
      }
    }));
  }

  handleUserUpdate = async (e) => {
    e.preventDefault();
    const userData = this.state.userForm
    console.log(userData)
    const id = this.state.user.id
    const resp = await updateUser(id, userData);
    console.log(resp);
    this.setState({
      updateResponse: resp
    });
  };
  render() {
    return (
      <div>
        <h2>Hey it's a profile!</h2>
        <UserForm
          userForm={this.state.userForm}
          handleChange={this.handleUserChange}
          handleUpdate={this.handleUserUpdate} />
      </div>
    )
  }
}

export default Profile
