import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as groupActions from '../../store/groups';

const UpdateGroupForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const group = useSelector(state => state.groups.currentGroup);
  let { groupId } = useParams();
  let { city, state, name, about, type } = group;
  let privacy = group.private;

  const [updatedCity, setUpdatedCity] = useState(city);
  const [updatedState, setUpdatedState] = useState(state);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedAbout, setUpdatedAbout] = useState(about);
  const [updatedType, setUpdatedType] = useState(type);
  const [updatedPrivacy, setUpdatedPrivacy] = useState(privacy);
  // const [imgUrl, setImgUrl] = useState('');
  const [errors, setErrors] = useState([]);

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(groupActions.getGroupDetail(groupId))
  }, [dispatch, groupId])

  const handleSubmit = (e) => {
    e.preventDefault();

    const group = { city: updatedCity, state: updatedState, name: updatedName, about: updatedAbout, type: updatedType, private: updatedPrivacy }

    return dispatch(groupActions.updateGroup(group, groupId))
      .then(() => goBack())
      .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors) setErrors(data.errors);
      })
  }

  return (
    <div id='main-form-container'>
      <div className='sub-form-container'>
        <h3>UPDATE YOUR GROUP'S INFORMATION</h3>
        <h1>We'll walk you through a few steps to build your local community</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <h1>First, set your group's location</h1>
            <h3>Meetup groups meet locally, in person and online. We'll connect you with people in your area, and more can join you online.</h3>
            <input
              type='text'
              value={updatedCity}
              onChange={(e) => setUpdatedCity(e.target.value)}
              required
              placeholder='City' name='city'></input>
            <input
              type='text'
              value={updatedState}
              onChange={(e) => setUpdatedState(e.target.value)}
              required
              placeholder='State' name='state'></input>
          </div>

          <div>
            <h1>What will your group's name be?</h1>
            <h3>Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</h3>
            <input
              type='text'
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              required
              placeholder='Group Name' name='name'></input>
          </div>

          <div>
            <h1>Now describe what your group will be about</h1>
            <h3>People will see this when we promote your group, but you'll be able to add to it later, too.</h3>
            <ol>
              <li>What's the purpose of the group?</li>
              <li>Who should join?</li>
              <li>What will you do at your events?</li>
            </ol>
            <textarea
              type='text'
              value={updatedAbout}
              onChange={(e) => setUpdatedAbout(e.target.value)}
              required
              placeholder='Please write at least 30 characters' name='about'></textarea>
          </div>

          <div id='final-steps-div'>
            <div>
              <h1>Final steps...</h1>
              <h3>Is this an in person or online group?</h3>
              <select
                name='meeting type'
                value={updatedType}
                onChange={(e) => setUpdatedType(e.target.value)}
                required
              >
                <option value=''>(select one)</option>
                <option value='In Person'>In Person</option>
                <option value='Online'>Online</option>
              </select>
            </div>

            <div>
              <h3>Is this group private or public?</h3>
              <select
                name='privacy'
                value={updatedPrivacy}
                onChange={(e) => setUpdatedPrivacy(e.target.value)}
                required
              >
                <option value=''>(select one)</option>
                <option value={true}>Private</option>
                <option value={false}>Public</option>
              </select>
            </div>

            {/* <div>
              <h3>Please add an image url for your group below:</h3>
              <input
                type='text'
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                required
                placeholder='Image url' name='image url'></input>
            </div> */}
          </div>

          {errors && <ul className='errors'>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>}

          <button type='submit' className='update-button'>
            Update Group
          </button>

        </form>
      </div>
    </div>
  )
};


export default UpdateGroupForm;
