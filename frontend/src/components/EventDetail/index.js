import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as eventActions from '../../store/events';

<script src="https://kit.fontawesome.com/97726b2eee.js" crossorigin="anonymous"></script>

const EventDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();

  const event = useSelector(state => state.events?.currentEvent);
  const eventStart = new Date(event.startDate);
  const eventEnd = new Date(event.endDate);

  useEffect(() => {
    dispatch(eventActions.getEventDetail(eventId));
  }, [dispatch, eventId]);

  const handleBreadCrumb = () => {
    history.push(`/events`);
  };

  const handleGroupCrumb = () => {
    const groupId = event.Group?.id
    history.push(`/groups/${groupId}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to remove this event?')) {
      dispatch(eventActions.removeEvent(eventId))
      history.push(`/events`);
    }
  };

  return (
    <div className='main-event-detail-container'>

      <div className='event-detail-header'>
        <div onClick={handleBreadCrumb}>
          {`< Events`}
        </div>

        <h1>{event.name}</h1>
        <h3>Hosted by {event.Organizer?.firstName} {event.Organizer?.lastName}</h3>
      </div>

      <div className='event-detail-main'>

        <div className='img-div'>
          <img src={event.previewImage} alt='event'></img>
        </div>

        <div className='event-detail-group-crumb' onClick={handleGroupCrumb}>
          <img src={event.Group?.previewImage} alt='group'></img>
          <h2>{event.Group?.name}</h2>
          {event.Group?.private && <h4>Private</h4>}
          {!event.Group?.private && <h4>Public</h4>}
        </div>

        <div className='event-detail-info'>

          <div className='event-date'>
            <img src='https://res.cloudinary.com/dcbexnl8j/image/upload/v1678576951/meetup%20shit/black-clock-icon-Graphics-1-580x386_xf8qsw.jpg' alt='date icon'></img>

            <div className='timeSubDiv'>
              <div className='startEndDiv'>
                  <h4>Start:</h4> <h5>{eventStart.toLocaleDateString()} - {eventStart.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                  })}</h5>
              </div>
              <div className='startEndDiv'>
                  <h4>End: </h4> <h5>{eventEnd.toLocaleDateString()} - {eventEnd.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                  })}</h5>
              </div>
            </div>
          </div>

          <div className='event-price'>
            <img src='https://res.cloudinary.com/dcbexnl8j/image/upload/v1678576967/meetup%20shit/download_mmpmfn.png' alt='price icon'></img>
            <h4>${event.price}</h4>
          </div>

          <div className='event-type'>
            <img src='https://res.cloudinary.com/dcbexnl8j/image/upload/v1678577059/meetup%20shit/images_y3et4x.png' alt='type icon'></img>
            <h4>{event.type}</h4>
          </div>

          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <div className='event-detail-about'>
        <h2>Details</h2>
        <p>{event.description}</p>
      </div>
    </div>
  )
};

export default EventDetail;
