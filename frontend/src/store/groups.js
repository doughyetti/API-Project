const GET_GROUPS = 'groups/GET_GROUPS';

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

const initialState = {};

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUPS: {
      const newState = {};
      action.groups.Groups.forEach((group) => (newState[group.id] = group));
      return newState;
    }
    default:
      return state;
  }
};

export default groupsReducer;
