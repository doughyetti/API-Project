import { csrfFetch } from './csrf';

const GET_GROUPS = 'groups/GET_GROUPS';
const GROUP_DETAIL = 'groups/GROUP_DETAIL';

const getGroups = (groups) => ({
  type: GET_GROUPS,
  groups
});

export const getAllGroups = () => async (dispatch) => {
  const res = await fetch('/api/groups');

  if (res.ok) {
    const data = await res.json();

    dispatch(getGroups(data));
    return data;
  }
};

const groupDetail = (group) => ({
  type: GROUP_DETAIL,
  group
});

export const getGroupDetail = (groupId) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${groupId}`);

  if (res.ok) {
    const data = await res.json();

    dispatch(groupDetail(data));
    return data;
  }
};

const initialState = {
  currentGroup: {}
};

const groupsReducer = (state = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case GET_GROUPS: {
      action.groups.Groups.forEach((group) => (newState[group.id] = group));
      return newState;
    }
    case GROUP_DETAIL: {
      newState = {...state, currentGroup: action.group}
      return newState
    }
    default:
      return state;
  }
};

export default groupsReducer;
