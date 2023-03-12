import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../store/events';

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
          <h1>Groups</h1>
        </div>
        <h3>Events in Meetup</h3>

        <div>
          {events.map((event, idx) => {
            let eventDate = new Date(event.startDate);

            return (
              <div key={idx} className="allEventsContainer" >
                  <div onClick={() => history.push(`/events/${event.id}`)}>

                      <img src={event.previewImage} alt='event'></img>

                      <div className="event-details">
                          <h3>{eventDate.toLocaleDateString()} {eventDate.toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                          })}</h3>
                          <h4>{event.name}</h4>
                          {event?.Venue?.city && <h3>{event.Venue.city}</h3>}
                          <h5>{event.type}</h5>
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
