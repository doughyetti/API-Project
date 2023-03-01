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
      <h1>Events</h1>
      <h1>Groups</h1>
      <h3>Groups in Meetup</h3>
      <div>
        {allGroups.map(({ id, previewImage, name, city, state, about }) => (
        <>
          <img src={previewImage} alt={name}/>
          <h1 key={id}>{name}</h1>
          <h3>{city}, {state}</h3>
          <div>{about}</div>
        </>
        ))}
      </div>
    </>
  )
}

export default GroupsPage;
