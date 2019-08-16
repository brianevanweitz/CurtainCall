import React from 'react'

const UserForm = (props) => {
  return (
    <div>
      <form className="form" onSubmit={props.handleUpdate} >
        <p>Name:</p>
        <input className="user-input" name='name' type='text' value={props.userForm.name} onChange={props.handleChange} />
        <p>Email:</p>
        <input className="user-input" name='email' type='text' value={props.userForm.email} onChange={props.handleChange} />
        <p>What three shows do you most want to see?</p>
        <input className="user-input" name='fave_show_1' type='text' value={props.userForm.fave_show_1} onChange={props.handleChange} />
        <input className="user-input" name='fave_show_2' type='text' value={props.userForm.fave_show_2} onChange={props.handleChange} />
        <input className="user-input" name='fave_show_3' type='text' value={props.userForm.fave_show_3} onChange={props.handleChange} />
        <p>What's your budget?</p>
        <select className="user-select" name='budget' value={props.userForm.budget} onChange={props.handleChange}>
          <option value='$: Off-off-broadway'>$: Off-off-broadway</option>
          <option value='$$: Lottery buddies'>$$: Lottery buddies</option>
          <option value='$$$: Rush or bust'>$$$: Rush or bust</option>
          <option value='$$$$: Will trade firstborn for tickets'>$$$$: Will trade firstborn for tickets</option>
        </select>
        <p>Post a link to your profile picture:</p>
        <input className="user-input" name='profile_pic' type='text' value={props.userForm.profile_pic} onChange={props.handleChange} />
        <button className="user-button">Update your profile</button>
      </form>
    </div>
  )
};

export default UserForm;
