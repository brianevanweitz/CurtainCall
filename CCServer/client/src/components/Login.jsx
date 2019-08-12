import React from 'react';
import { Link } from 'react-router-dom';


// This component handles our login form and has a link to the register form
const Login = (props) => {
  return (
    <div className="auth-container">
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin(props.loginForm);
      }}>
        <p>Email:</p>
        <input name="email" type="text" value={props.loginForm.email} onChange={props.handleChange} />
        <p>Password:</p>
        <input name="password" type="password" value={props.loginForm.password} onChange={props.handleChange} />
        <button>Login</button>
      </form>
      <p>Haven't joined us yet? <button onClick={props.registerChange}>Make an account!</button></p>
    </div>
  );
}

export default Login;