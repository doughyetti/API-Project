import { csrfFetch } from "./csrf";

const ALL_EVENTS = 'events/ALL_EVENTS';

const allEvents = (events) => ({
  type: ALL_EVENTS,
  events
});

const getAllEvents = () => async (dispatch) => {
  const res = await csrfFetch('/api/events');

  if (res.ok) {
    const data = res.json();

    dispatch(allEvents(events));
    return data;
  }
};

const initialState = {
  allEvents: [],
  currentEvent: {}
};

const eventsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case ALL_EVENTS:
      return {...state, allEvents: [...action.events.Events]};
  default:
    return state;
  }
};

export default eventsReducer;
