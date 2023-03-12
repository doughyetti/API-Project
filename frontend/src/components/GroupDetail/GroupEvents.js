 import { useHistory } from 'react-router-dom';

function GroupEventsComponent ({ events }) {
  const history = useHistory();

  // eslint-disable-next-line
  let upcomingEvents = events.map(event => {
    let now = new Date();
    let eventDate = new Date(event?.startDate);

    if (eventDate > now) {
      return (
        <div key={event.id} className='event-container' onClick={() => history.push(`/events/${event.id}`)}>
          <img src={event.previewImage} alt='event' />

          <div className='event-details'>
            <h5 className='event-date-time'>{eventDate.toLocaleDateString()} {eventDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            })}</h5>
            <h2>{event.name}</h2>
            <h4>{event.Venue?.city}, {event.Venue?.state}</h4>
          </div>

          <div className='event-about'>
            <p>{event.description}</p>
          </div>
        </div>
      )
    }
  });

  // eslint-disable-next-line
  let pastEvents = events.map(event => {
    let now = new Date();
    let eventDate = new Date(event?.startDate);

    if (eventDate < now) {
      return (
        <div key={event.id} className='event-container' onClick={() => history.push(`/events/${event.id}`)}>
          <img src={event.previewImage} alt='event' />

          <div className='event-details'>
            <h5 className='event-date-time'>{eventDate.toLocaleDateString()} {eventDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            })}</h5>
            <h2>{event.name}</h2>
            <h4>{event.Venue?.city}, {event.Venue?.state}</h4>
          </div>

          <div className='event-about'>
            <p>{event.description}</p>
          </div>
        </div>
      )
    }
  });

  return (
    <>
      <h1>Upcoming Events</h1>
      {upcomingEvents.length > 0 && upcomingEvents}
      {upcomingEvents.length === 0 && <h1>No upcoming events</h1>}
      <h1>Past Events</h1>
      {pastEvents.length > 0 && pastEvents}
      {pastEvents.length === 0 && <h1>No Past Events</h1>}
    </>
  )
};

export default GroupEventsComponent;
