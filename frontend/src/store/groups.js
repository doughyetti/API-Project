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
  const res = await csrfFetch('/api/groups');

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
  const { previewImage } = group;

  const res = await csrfFetch(`/api/groups`, {
    method: 'POST',
    body: JSON.stringify(group)
  });

  if (res.ok) {
    const data = await res.json();

    const imgObj = { url: previewImage, groupId: data.id, preview: true };

    await csrfFetch(`/api/groups/${data.id}/images`, {
      method: 'POST',
      body: JSON.stringify(imgObj)
    });

    dispatch(newGroup(data));
    return data;
  }
};

export const updateGroup = (group, groupId) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${groupId}`, {
    method: 'PUT',
    body: JSON.stringify(group)
  });

  if (res.ok) {
    const data = await res.json();

    dispatch(newGroup(group));
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
      return {
        ...state, allGroups: [...action.groups.Groups]
      };
    }
    case GROUP_DETAIL: {
      newState = { ...state, currentGroup: action.group }
      return newState
    }
    case NEW_GROUP: {
      if (!state.allGroups[action.group.id]) {
        newState = { ...state, allGroups: [...state.allGroups, action.group] }
        return newState;
      } else {
        newState = { ...state, allGroups: [...state.allGroups, state.allGroups[action.group.id], action.group] }
        return newState;
      }
    }
    case DELETE_GROUP: {
      newState = {...state}
      delete newState.allGroups[action.groupId]
      return newState;
    }
    default:
      return state;
  }
};

export default groupsReducer;
