import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGroupDetail } from '../../store/groups';

const GroupDetail = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams();

  const groupDetails = useSelector((state) => state.group[groupId]);
};

export default GroupDetail;
