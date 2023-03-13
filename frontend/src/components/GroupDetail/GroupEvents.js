 import { useHistory } from 'react-router-dom';

 import '../EventsPage/EventsPage.css';

function GroupEventsComponent ({ events }) {
  const history = useHistory();

  // eslint-disable-next-line
  let upcomingEvents = events.map(event => {
    let now = new Date();
    let eventDate = new Date(event?.startDate);

    if (eventDate > now) {
      return (
        <div key={event.id} className='event-card-2' onClick={() => history.push(`/events/${event.id}`)}>

          <div className='event-card-container'>
            <div className='event-card-image'>
              <img src={event.previewImage} alt='event' />
            </div>

            <div className='event-details'>
              <h4 className='event-date-time'>{eventDate.toLocaleDateString()} &#8226; {eventDate.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
              })}</h4>
              <h2>{event.name}</h2>
              <h4>{event.Venue?.city}, {event.Venue?.state}</h4>
            </div>
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
        <div key={event.id} className='event-card-2' onClick={() => history.push(`/events/${event.id}`)}>

          <div className='event-card-container'>
            <div className='event-card-image'>
              <img src={event.previewImage} alt='event' />
            </div>

            <div className='event-details'>
              <h4 className='event-date-time'>{eventDate.toLocaleDateString()} &#8226; {eventDate.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
              })}</h4>
              <h2>{event.name}</h2>
              <h4>{event.Venue?.city}, {event.Venue?.state}</h4>
            </div>
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
