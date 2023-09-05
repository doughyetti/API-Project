import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import LoginModalBtn from "./LoginModalBtn";
import SignupModalBtn from "./SignupModalBtn";
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <ul className='sessionUL'>
        <li>
          <LoginModalBtn
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
          <SignupModalBtn
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </li>
      </ul>
    );
  }

  return (
    <div className='mainavDiv'>
      <ul className='navUl'>
          <li className='homeButtonLi'>
              <NavLink className='homeButton' exact to='/'>Meetup</NavLink>
          </li >
          <li className='navLi'>
              {isLoaded && sessionLinks}
          </li>
      </ul>
    </div>
    // <ul>
    //   <li>
    //     <NavLink exact to="/">Home</NavLink>
    //   </li>
    //   {isLoaded && sessionLinks}
    // </ul>
  );
}

export default Navigation;
