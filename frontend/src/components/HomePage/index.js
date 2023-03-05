import { NavLink } from 'react-router-dom';

import './HomePage.css';

const HomePage = () => {
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
          <img src='https://res.cloudinary.com/dcbexnl8j/image/upload/v1677877231/meetup%20shit/4575-scaled_rpvpck.webp' alt='groups-icon' />
          <NavLink to='/groups'>See All Groups</NavLink>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
        </div>
      </div>
    </div>
  )
};

export default HomePage;
