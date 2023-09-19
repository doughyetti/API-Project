import { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignupFormModal from "../SignupFormModal";
import SignupModalHome from "./SignupModalHome";

import './HomePage.css';

const HomePage = () => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session?.user);

  const [userLoggedIn, setUserLoggedIn] = useState(true);

  let startGroupIdName = !userLoggedIn ? "start-group-disabled" : "start-group";
  let joinButton = !userLoggedIn ? "signup-button" : "signup-button-hidden";

  useEffect(() => {
    if (sessionUser) {
        setUserLoggedIn(true)
    } else {
        setUserLoggedIn(false)
    }
  }, [sessionUser])

  const handleSignup = () => {
    history.push(`/signup`);
  };

  return (
    <div className='grid-home-container'>

      <div className='grid item grid-item-1'>
        <div>
          <h1>The People platform - Where interests become friendships</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <img className='home-image' src='https://res.cloudinary.com/dcbexnl8j/image/upload/v1677873951/meetup%20shit/online_events_u9vb5t.svg' alt='meetup-icon' />
      </div>

      <div className='grid item grid-item-2'>
        <h1>How Meetup Works</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>

      <div className='grid item grid-item-3'>
        <div>
          <img src='https://res.cloudinary.com/dcbexnl8j/image/upload/v1678644792/meetup%20shit/handsUp_onxtzl.svg' alt='groups-icon' />
          <NavLink className ='grid-item-3-navlinks' to='/groups'>See All Groups</NavLink>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
        </div>

        <div>
          <img src='https://res.cloudinary.com/dcbexnl8j/image/upload/v1678644548/meetup%20shit/ticket_vc9rya.svg' alt='events-icon' />
          <NavLink className ='grid-item-3-navlinks' to='/events'>Find An Event</NavLink>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
        </div>

        <div id={startGroupIdName}>
          <img src='https://res.cloudinary.com/dcbexnl8j/image/upload/v1678644571/meetup%20shit/joinGroup_ufqm4a.svg' alt='create-group-icon' />
          <NavLink className ='grid-item-3-navlinks' to='/groups/new'>Start a group</NavLink>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
        </div>
      </div>

      <div className='button-section'>
        <SignupModalHome
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    </div>
  )
};

export default HomePage;
