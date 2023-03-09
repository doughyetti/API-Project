import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as groupActions from '../../store/groups';
// import { confirmAlert } from 'react-confirm-alert';

const GroupDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { groupId } = useParams();

  const group = useSelector((state) => state.groups.currentGroup);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(groupActions.getGroupDetail(groupId))
    setLoaded(true)
  }, [dispatch, groupId])

  const goBack = () => {
    history.goBack();
  };

  const handleDelete = () => {
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

        <div className='back-button'>
          <button onClick={goBack}>{`< Back`}</button>
        </div>

        <div className='group-info'>
          <img src={group?.previewImage} alt='group' />
          <div className='group-main-text'>
            <h1>{group?.name}</h1>
            <h4>{group?.city}, {group?.state}</h4>
            <h4>{group?.private ? "Private" : "Public"}</h4>
            <h4>Organized by {group?.Organizer?.firstName} {group?.Organizer?.lastName}</h4>
          </div>

          <div className='group-info-buttons'>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>

      </div>

      <div className='group-sub-details'>
        <h2>Organizer</h2>
        <h4>{group?.Organizer?.firstName} {group?.Organizer?.lastName}</h4>
        <h2>What we're about</h2>
        <p>{group?.about}</p>
      </div>
    </div>
  )
};

export default GroupDetail;
