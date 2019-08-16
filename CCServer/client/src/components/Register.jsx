import React from 'react';

// This component handles our register form
const Register = (props) => {

  return (
    <div className='auth-container'>
      <form className="form" onSubmit={props.handleRegister} >
        <input className="form-input" name='name' type='text' placeholder="Name" value={props.registerForm.name} onChange={props.handleChange} />
        <input className="form-input" name='email' type='text' placeholder="email" value={props.registerForm.email} onChange={props.handleChange} />
        <input className="form-input" name='password' type='password' placeholder="password" value={props.registerForm.password} onChange={props.handleChange} />
        <button className="form-button">Register</button>
      </form>
      <div className="reg-redirect">
        <button className="redirect-button" onClick={props.loginChange}>Take me back to the login page</button>
      </div>
    </div>
  );
}

export default Register;