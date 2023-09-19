import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import LoginModalRef from "./LoginRefModal";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form-sub-container">
        <div className="signup-header">
          <img className="meet-icon" alt="meetup" src="https://res.cloudinary.com/dcbexnl8j/image/upload/v1693948323/meetup%20shit/meetup-icon_n56qwx.png" alt="login" />
          <h1>Sign up</h1>
          <span>Already a member?
            <LoginModalRef
              buttonText="Sign in"
              modalComponent={<LoginFormModal />}
            />
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label className='login-labels'>
            Email
            <input className="login-inputs"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className='login-labels'>
            Username
            <input className="login-inputs"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className='login-labels'>
            First Name
            <input className="login-inputs"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label className='login-labels'>
            Last Name
            <input className="login-inputs"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
          <label className='login-labels'>
            Confirm Password
            <input className="login-inputs"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          <div className="login-btns-container">
            <button className="login-btns" type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
