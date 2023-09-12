import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleDemo = (e) =>{
    e.preventDefault();
    return dispatch(sessionActions.login({ credential:'Demo-lition', password:'password' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='form-container'>
      <div className="form-sub-container">
        <div className="login-header">
          <img className="login-icon" src="https://res.cloudinary.com/dcbexnl8j/image/upload/v1693948323/meetup%20shit/meetup-icon_n56qwx.png" />
          <h1>Log in</h1>
          <p>Not a member yet?</p>
        </div>

        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label className='login-labels'>
            Email
            <input className="login-inputs"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label className='login-labels'>
            Password
            <input className="login-inputs"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Log In</button>
          <button type='submit' onClick={handleDemo}>Demo User</button>
        </form>

      </div>
    </div>
  );
}

export default LoginFormModal;
