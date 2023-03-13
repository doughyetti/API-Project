import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as groupActions from '../../store/groups';
import * as eventActions from '../../store/events';

import './EventNewForm.css';

const NewEventForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { groupId } = useParams();

  const currentGroup = useSelector(state => state.groups.currentGroup);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [privacy, setPrivacy] = useState();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [errors, setErrors] = useState([]);
  const [submissionAttempt, setSubmissionAttempt] = useState(false);

  useEffect(() => {
    const loadErrors = [];

    if (!name.length) loadErrors.push('Event name is required');
    if (type !== 'In Person' || type !== 'Online') loadErrors.push('Group type is required');
    if (!privacy) loadErrors.push('Visibility Type is required');
    if (!price) loadErrors.push('Price is required');
    if (!startDate) loadErrors.push('Event start is required');
    if (!endDate) loadErrors.push('Event end is required');
    if (description.length < 30) loadErrors.push('Description must be at least 30 characters long');
    setErrors(loadErrors);
  }, [ name, type, privacy, description, price, startDate, endDate]);


  useEffect(() => {
    dispatch(groupActions.getGroupDetail(groupId));
  }, [dispatch, groupId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (errors.length) {
      setSubmissionAttempt(true)
    } else {
      const event = { groupId: currentGroup.id, name, type, description, price, startDate, endDate, previewImage: imgUrl }

      return dispatch(eventActions.createNewEvent(currentGroup.id, event))
        .then((res) => history.push(`/events/${res.id}`))
        .catch(async (res) => {
          const data = await res.json();

          if (data && data.errors) setErrors(data.errors);
      })
    }
  };

  return (
    <div className='main-new-event-container'>
      <h1>Create an event for {currentGroup.name}</h1>

      <div className='form-container'>
        <form className='new-event-form' onSubmit={handleSubmit}>

        {submissionAttempt && <ul className='errors'>
          {errors.map((error, idx) =>
            <li key={idx}>{error}</li>)}
          </ul>}

          <div className='border-div'>
            <h3>What is the name of your event?</h3>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Event Name'
              name='name' />
          </div>

          <div>
            <h3>Is this an in person or online event?</h3>
            <select
                name='type'
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="">(select one)</option>
                <option value="In Person">In Person</option>
                <option value="Online">Online</option>
            </select>
          </div>

          <div>
            <h3>Is this group private or public?</h3>
            <select
              name='privacy'
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
            >
              <option value=''>(select one)</option>
              <option value={true}>Private</option>
              <option value={false}>Public</option>
            </select>
          </div>

          <div className='border-div'>
            <h3>What is the price for your event?</h3>
            <div id='dollarDiv'>
                <span className='dollarSpan'>$</span>
                <input
                    className='currency'
                    type="number"
                    min="0"
                    max="999999"
                    id="priceNumber"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
          </div>

          <div className='border-div'>
            <h3>When does your event start?</h3>
            <input className='date-input' type="datetime-local"
                name='startDate'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <h3>When does your event end?</h3>
            <input className='date-input' type="datetime-local"
                name='startDate'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className='border-div'>
            <h3>Please add an image url for your event below:</h3>
            <input type="text"
                name='imgUrl'
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
            />
          </div>

          <div>
            <h3>Please describe your event:</h3>
            <textarea type="text"
              name='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            type='submit' className='newEventSubmitButton'>
              Create Event
          </button>

        </form>
      </div>
    </div>
  )
};

export default NewEventForm;
