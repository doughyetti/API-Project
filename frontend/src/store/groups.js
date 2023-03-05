const GET_GROUPS = 'groups/GET_GROUPS';
const GROUP_DETAIL = 'groups/GROUP_DETAIL';

const getGroups = (groups) => ({
  type: GET_GROUPS,
  groups
});

const groupDetail = (group) => ({
  type: GROUP_DETAIL,
  group
});

export const getAllGroups = () => async (dispatch) => {
  const res = await fetch('/api/groups');

  if (res.ok) {
    const data = await res.json();

    dispatch(getGroups(data));
    return data;
  }
};

export const getGroupDetail = (group) => async (dispatch) => {
  const res = await fetch(`/api/groups/${group.id}`);

  if (res.ok) {
    const data = await res.json();

    dispatch(groupDetail(data));
    return data;
  }
};

const initialState = {};

const groupsReducer = (state = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case GET_GROUPS: {
      action.groups.Groups.forEach((group) => (newState[group.id] = group));
      return newState;
    }
    case GROUP_DETAIL: {
      newState = {...state, [action.group.id]: action.group}
      return newState
    }
    default:
      return state;
  }
};

export default groupsReducer;
