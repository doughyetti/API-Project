import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import GroupEventsComponent from './GroupEvents';
import * as groupActions from '../../store/groups';

import './GroupDetail.css';

const GroupDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { groupId } = useParams();

  const group = useSelector((state) => state.groups.currentGroup);
  const events = useSelector((state) => state.groups.currentGroupEvents);
  const sessionUser = useSelector(state => state.session?.user);


  const [loaded, setLoaded] = useState(false);
  const [userIsOrganizer, setUserIsOrganizer] = useState(false);

  useEffect(() => {
    sessionUser?.id === group?.Organizer?.id ? setUserIsOrganizer(true) : setUserIsOrganizer(false)
  }, [sessionUser, group]);

  useEffect(() => {
    dispatch(groupActions.getGroupDetail(groupId))
    dispatch(groupActions.getGroupEvents(groupId))
    setLoaded(true)
  }, [dispatch, groupId])

  const handleBreadCrumb = () => {
    history.push(`/groups`);
  };

  const handleCreateEvent = () => {
    history.push(`/groups/${groupId}/events`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to remove this group?')) {
      dispatch(groupActions.removeGroup(groupId))
      history.push(`/groups`);
    }
  };

  const handleUpdate = () => {
    history.push(`/groups/${groupId}/edit`);
  };

  return (
    loaded && <div className='group-detail-container'>
      <div className='group-main-details'>

        <div className='group-breadcrumb'>
          &lt;
          <div onClick={handleBreadCrumb}>
            Groups
          </div>
        </div>

        <div className='group-info'>
          <img src={group?.previewImage} alt='group' />

          <div className='group-main-text'>
            <h1>{group?.name}</h1>
            <h4>{group?.city}, {group?.state}</h4>
            <h4>{events.length} events &#8226; {group?.private ? "Private" : "Public"}</h4>
            <h4>Organized by {group?.Organizer?.firstName} {group?.Organizer?.lastName}</h4>

            {userIsOrganizer &&
            <div className='group-info-buttons'>
              <button onClick={handleCreateEvent}>Create event</button>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={handleUpdate}>Update</button>
            </div>}
          </div>
        </div>
      </div>

      <div className='group-sub-details'>
        <h2>Organizer</h2>
        <h4>{group?.Organizer?.firstName} {group?.Organizer?.lastName}</h4>
        <h2>What we're about</h2>
        <p>{group?.about}</p>
      </div>
      <div className='events'>
        <GroupEventsComponent events={events} />
      </div>
    </div>
  )
};

export default GroupDetail;
