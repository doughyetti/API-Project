import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from '../../store/groups';

import './GroupsPage.css';

const GroupsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const allGroups = useSelector((state) => Object.values(state.groups.allGroups));

  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);

  return (
    <>
      <div className='groups-list-card'>
        <div className='groups-list-header'>
          <h1>Events</h1>
          <h1>Groups</h1>
        </div>
        <h3>Groups in Meetup</h3>
        
        <div>
          {allGroups.map(({ id, previewImage, name, city, state, about }) => (
              <div className='group-card' key={id} onClick={() => history.push(`/groups/${id}`)}>
                <img src={previewImage} alt={name} />
                <h1>{name}</h1>
                <h3>{city}, {state}</h3>
                <p>{about}</p>
                {allGroups.private && <h4>Private</h4>}
                {!allGroups.private && <h4>Public</h4>}
              </div>
          ))}
        </div>
      </div>
    </>
  )
};

export default GroupsPage;
