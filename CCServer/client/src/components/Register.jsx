import React from 'react';

// This component handles our register form
const Register = (props) => {

  return (
    <div className='auth-container'>
      <form onSubmit={props.handleRegister} >
        <p>Name:</p>
        <input name='name' type='text' value={props.registerForm.name} onChange={props.handleChange} />
        <p>Email:</p>
        <input name='email' type='text' value={props.registerForm.email} onChange={props.handleChange} />
        <p>Password:</p>
        <input name='password' type='password' value={props.registerForm.password} onChange={props.handleChange} />
        <button>Register</button>
      </form>
      <button onClick={props.loginChange}>Take me back to the login page</button>
    </div>
  );
}

export default Register;