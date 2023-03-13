import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
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
          <NavLink className='log-links' to="/login">Log In</NavLink>
          <NavLink className='log-links' to="/signup">Sign Up</NavLink>
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
