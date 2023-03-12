import { csrfFetch } from "./csrf";

const ALL_EVENTS = 'events/ALL_EVENTS';
const EVENT_DETAIL = 'events/EVENT_DETAIL';
const NEW_EVENT = 'events/NEW_EVENT';
const DELETE_EVENT = 'events/DELETE_EVENT';

const allEvents = (events) => ({
  type: ALL_EVENTS,
  events
});

export const getAllEvents = () => async (dispatch) => {
  const res = await csrfFetch('/api/events');

  if (res.ok) {
    const data = await res.json();

    dispatch(allEvents(data));
    return data;
  }
};

const eventDetail = (event) => ({
  type: EVENT_DETAIL,
  event
});

export const getEventDetail = (eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${eventId}`);

  if (res.ok) {
    const data = await res.json();

    dispatch(eventDetail(data));
    return data;
  }
};

const newEvent = (event) => ({
  type: NEW_EVENT,
  event
});

export const createNewEvent = (groupId, event) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${groupId}/events`, {
    method: 'POST',
    body: JSON.stringify(event)
  });

  if (res.ok) {
    const data = await res.json();

    dispatch(newEvent(data));
    return data;
  }
};

const deleteEvent = (eventId) => ({
  type: DELETE_EVENT,
  eventId
});

export const removeEvent = (eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${eventId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const data = res.json();

    dispatch(deleteEvent(eventId));
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
      return {
        ...state, allEvents: [...action.events.Events]
      }
    case EVENT_DETAIL: {
      newState = {...state, currentEvent: action.event }
      return newState;
    }
    case NEW_EVENT: {
      newState = {...state, allEvents: [...state.allEvents, action.event] }
      return newState;
    }
    case DELETE_EVENT: {
      newState = {...state}
      delete newState.allEvents[action.eventId]
      return newState;
    }
    default:
      return state;
  }
};

export default eventsReducer;
