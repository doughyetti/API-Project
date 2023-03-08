import { csrfFetch } from './csrf';

const GET_GROUPS = 'groups/GET_GROUPS';
const GROUP_DETAIL = 'groups/GROUP_DETAIL';
const NEW_GROUP = 'groups/ADD_GROUP';
const DELETE_GROUP = 'groups/DELETE_GROUP';

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

const newGroup = (group) => ({
  type: NEW_GROUP,
  group
});

export const createNewGroup = (group) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(group)
  });

  if (res.ok) {
    const data = await res.json();

    dispatch(newGroup(data));
    return data;
  }
};

const deleteGroup = (groupId) => ({
  type: DELETE_GROUP,
  groupId
})

export const removeGroup = (groupId) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${groupId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteGroup(groupId));
    return data;
  }
}

const initialState = {
  allGroups: [],
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
    case NEW_GROUP: {
      newState = {...state, [action.group.id]: action.group}
      return newState;
    }
    case DELETE_GROUP: {
      newState = {...state}
      delete newState[action.groupId]
      return newState;
    }
    default:
      return state;
  }
};

export default groupsReducer;
