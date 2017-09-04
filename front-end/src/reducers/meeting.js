import { combineReducers } from 'redux';
import moment from 'moment';

import {
  TOGGLE_MEETING_WINDOW,
  CREATE_MEETING,
  CANCEL_MEETING,
  UPDATE_MEETING,
  RECEIVE_MEETINGS,
  JOIN_MEETING,
  UNJOIN_MEETING,
  SET_MEETING_ID,
  UPDATE_NEW_MEETING_DATE,
  UPDATE_NEW_MEETING_TIME,
  UPDATE_NEW_MEETING_DURATION,
} from '../constants/ActionTypes';

const setCanteenId = (state = null, action) => {
  if (action.type !== TOGGLE_MEETING_WINDOW) return state;
  return state === null ? action.canteenId : null;
};

const initialNewMeetingState = { duration: moment.duration(60, 'minutes') };
const updateNewMeeting = (state = initialNewMeetingState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MEETING_DATE:
      return {
        ...state,
        date: action.date,
      };
    case UPDATE_NEW_MEETING_TIME:
      return {
        ...state,
        time: action.time,
      };
    case UPDATE_NEW_MEETING_DURATION:
      return {
        ...state,
        duration: action.duration,
      };
    default:
      return state;
  }
};

const setMeetings = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_MEETINGS:
      return action.meetings;
    case CREATE_MEETING: {
      return {
        ...state,
        [action.tempId]: {
          canteenId: action.canteenId,
          startTime: action.startTime,
          duration: action.duration,
          isActive: true,
          attendees: [],
        },
      };
    }
    case SET_MEETING_ID: {
      const meetings = { ...state };
      meetings[action.id] = meetings[action.tempId];
      meetings[action.id].isIdSet = true;
      delete meetings[action.tempId];
      return meetings;
    }
    case CANCEL_MEETING: {
      // use flag instead of removing from array so that id can be maintained
      // and allows referencing cancelled meetings
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          isActive: false,
        },
      };
    }
    case UPDATE_MEETING: {
      return {
        ...state,
        [action.id]: action.meeting,
      };
    }
    case JOIN_MEETING: {
      const meeting = state[action.id];
      return {
        ...state,
        [action.id]: {
          ...meeting,
          attendees: [
            ...meeting.attendees,
            action.userId,
          ],
        },
      };
    }
    case UNJOIN_MEETING: {
      const meeting = state[action.id];
      return {
        ...state,
        [action.id]: {
          ...meeting,
          attendees: meeting.attendees.filter(id => id !== action.userId),
        },
      };
    }
    default:
      return state;
  }
};

const reducer = combineReducers({
  canteenId: setCanteenId,
  newMeeting: updateNewMeeting,
  meetings: setMeetings,
});

export default reducer;
