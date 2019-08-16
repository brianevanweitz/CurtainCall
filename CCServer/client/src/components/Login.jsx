import React from 'react';


// This component handles our login form and has a link to the register form
const Login = (props) => {
  return (
    <div className='auth-container'>
      <form className="form" onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin(props.loginForm);
      }}>
        <input className="form-input" name='email' type='text' placeholder="Email" value={props.loginForm.email} onChange={props.handleChange} />
        <input className="form-input" name='password' type='password' placeholder="Password" value={props.loginForm.password} onChange={props.handleChange} />
        <button className="form-button">Login</button>
      </form>
      <div className="redirect">
        <p>Haven't joined us yet? <button className="redirect-button" onClick={props.registerChange}>Make an account!</button></p>
      </div>
    </div>
  );
}

export default Login;