import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as groupActions from '../../store/groups';
import * as eventActions from '../../store/events';

const NewEventForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { groupId } = useParams();

  const currentGroup = useSelector(state => state.groups.currentGroup);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(groupActions.getGroupDetail(groupId));
  }, [dispatch, groupId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = { groupId: currentGroup.id, name, type, description, price, startDate, endDate, previewImage: imgUrl }

    return dispatch(eventActions.createNewEvent(currentGroup.id, event))
      .then((res) => history.push(`/events/${res.id}`))
      .catch(async (res) => {
          const data = await res.json();

          if (data && data.errors) setErrors(data.errors);
      })
  };

  return (
    <div className='main-new-event-container'>
      <h1>Create an event for {currentGroup.name}</h1>

      <div className='form-container'>
        <form className='new-event-form' onSubmit={handleSubmit}>

          <div>
            <h3>What is the name of your event?</h3>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder='Event Name'
              name='name' />
          </div>

          <div>
            <h3>Is this an in person or online event?</h3>
            <select
                name='type'
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
            >
                <option value="">(select one)</option>
                <option value="In Person">In Person</option>
                <option value="Online">Online</option>
            </select>
          </div>

          <div>
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

          <div>
            <h3>When does your event start?</h3>
            <input type="datetime-local"
                name='startDate'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <h3>When does your event end?</h3>
            <input type="datetime-local"
                name='startDate'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div>
            <h4>Please add an image url for your event below:</h4>
            <input type="text"
                name='imgUrl'
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
            />
          </div>

          <div>
            <h4>Please describe your event:</h4>
            <textarea type="text"
              name='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {errors && <ul className='errors'>
            {errors.map((error, idx) =>
              <li key={idx}>{error}</li>)}
            </ul>}
          <button
            type='submit' className='new-event-submit-button'>
              Create Event
          </button>

        </form>
      </div>
    </div>
  )
};

export default NewEventForm;
