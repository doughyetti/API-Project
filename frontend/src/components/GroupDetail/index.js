import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as groupActions from '../../store/groups';

const GroupDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { groupId } = useParams();

  const group = useSelector((state) => state.groups.currentGroup);

  const [loaded, setLoaded] = useState(false);

  const goBack = () => {
    history.goBack();
  }

  useEffect(() => {
    dispatch(groupActions.getGroupDetail(groupId))
    setLoaded(true)
  }, [dispatch, groupId])

  return (
    loaded && <div className='group-detail-container'>
      <div className='group-main-details'>

        <div className='back-button'>
          <button onClick={goBack}>{`< Back`}</button>
        </div>

        <div className='group-info'>
          <img src={group?.GroupImages[0]?.url} alt='group' />
          <div className='group-main-text'>
            <h1>{group?.name}</h1>
            <h4>{group?.city}, {group?.state}</h4>
            <h4>{group?.private ? "Private" : "Public"}</h4>
            <h4>Organized by {group?.Organizer?.firstName} {group?.Organizer?.lastName}</h4>
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
