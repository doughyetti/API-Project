import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from '../../store/groups';

const GroupsPage = () => {
  const dispatch = useDispatch();
  const allGroups = useSelector((state) => Object.values(state.groups));

  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);

  return (
    <>
      <div className='allGroups-card'>
        <h1>Events</h1>
        <h1>Groups</h1>
        <h3>Groups in Meetup</h3>
      </div>
      <div>
        {allGroups.map(({ id, previewImage, name, city, state, about }) => (
          <>
            <div className='group-card'>
              <img src={previewImage} alt={name} />
              <h1 key={id}>{name}</h1>
              <h3>{city}, {state}</h3>
              <p>{about}</p>
              {allGroups.private && <h4>Private</h4>}
              {!allGroups.private && <h4>Public</h4>}
            </div>
          </>
        ))}
      </div>
    </>
  )
};

export default GroupsPage;
