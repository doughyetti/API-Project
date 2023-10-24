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
          <p>Meetup is a popular online platform designed to facilitate in-person group gatherings and events based on common interests. Meetup allows users to create or join groups centered around specific topics,
            hobbies, or activities. Members can connect with like-minded individuals, participate in discussions, and organize or attend real-life events and meetups in their local communities. The platform covers a wide range of interests,
            including sports, technology, arts, fitness, and more. Meetup aims to foster community engagement, social interaction, and the formation of meaningful relationships among people who share similar passions or goals. Participants can
            find and join meetups relevant to their interests, enabling them to network, learn new skills, or simply socialize with others who share their hobbies.</p>
        </div>
        <img className='home-image' src='https://res.cloudinary.com/dcbexnl8j/image/upload/v1677873951/meetup%20shit/online_events_u9vb5t.svg' alt='meetup-icon' />
      </div>

      <div className='grid item grid-item-2'>
        <h1>How Meetup Works</h1>
        <p>People use Meetup to meet new people, learn new things, find support, get out of their comfort zones, and pursue their passions, together. Membership is free.</p>
      </div>

      <div className='grid item grid-item-3'>
        <div>
          <img src='https://res.cloudinary.com/dcbexnl8j/image/upload/v1678644792/meetup%20shit/handsUp_onxtzl.svg' alt='groups-icon' />
          <NavLink className ='grid-item-3-navlinks' to='/groups'>See All Groups</NavLink>
          <p>Find groups that cater to your interests and build real connections with like-minded individuals. You could make a long-long friend or even a potential partner!</p>
        </div>

        <div>
          <img src='https://res.cloudinary.com/dcbexnl8j/image/upload/v1678644548/meetup%20shit/ticket_vc9rya.svg' alt='events-icon' />
          <NavLink className ='grid-item-3-navlinks' to='/events'>Find An Event</NavLink>
          <p>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Meetup. Events are happening every day—sign up to join the fun.</p>
        </div>

        <div id={startGroupIdName}>
          <img src='https://res.cloudinary.com/dcbexnl8j/image/upload/v1678644571/meetup%20shit/joinGroup_ufqm4a.svg' alt='create-group-icon' />
          <NavLink className ='grid-item-3-navlinks' to='/groups/new'>Start a group</NavLink>
          <p>Spark new friendships. Start a group to meet people who are new in town or longtime locals. Enjoy nightlife, happy hours, game nights, music, and more.</p>
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
