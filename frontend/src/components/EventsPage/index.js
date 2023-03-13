import { useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../store/events';

import './EventsPage.css';

const EventsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const events = useSelector(state => { return state.events.allEvents });

  useEffect(() => {
    dispatch(getAllEvents())
  }, [dispatch]);

  return (
    <>
      <div className='events-list-card'>
        <div className='events-list-header'>
          <h1>Events</h1>
          <NavLink className='group-link' to='/groups'>Groups</NavLink>
        </div>

        <div className='events-list-header-2'>
          <h4>Events in Meetup</h4>
        </div>

        <div className='main-event-container'>
          {events.map((event, idx) => {
            let eventDate = new Date(event.startDate);

            return (
              <div key={idx} className="event-card" onClick={() => history.push(`/events/${event.id}`)}>

                <div className='event-card-container'>
                  <div className='event-card-image'>
                    <img src={event.previewImage} alt='event'></img>
                  </div>

                  <div className="event-details">
                      <h4>{eventDate.toLocaleDateString()} &#8226; {eventDate.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                      })}</h4>
                      <h2>{event.name}</h2>
                      {event?.Venue?.city && <h4>{event.Venue.city}</h4>}
                      {/* <h5>{event.type}</h5> */}
                  </div>
                </div>

                <p>{event.description}</p>
              </div >
            )
          })}
        </div>
      </div>
    </>
  )
};

export default EventsPage;
