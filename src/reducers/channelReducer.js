import {
  SEARCH_CHANNELS,
  SET_CHANNEL_INFO,
  SET_CURRENT_CHANNEL_ID,
  SET_CURRENT_CHANNEL_FOLLOWING,
  SET_CHANNEL_FOLLOWERS_COUNT
} from "../actions/types";

const initialState = {
  channels: null,
  currentChannelInfo: null,
  currentChannelId: -1,
  currentChannelFollowing: null,
  currentChannelTotalFollowers: -1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_CHANNELS:
      return {
        ...state,
        channels: action.payload
      };
    case SET_CHANNEL_INFO:
      return {
        ...state,
        currentChannelInfo: action.payload
      };
    case SET_CURRENT_CHANNEL_ID:
      return {
        ...state,
        currentChannelId: action.payload
      };
    case SET_CURRENT_CHANNEL_FOLLOWING:
      return {
        ...state,
        currentChannelFollowing: action.payload
      };
    case SET_CHANNEL_FOLLOWERS_COUNT:
      return {
        ...state,
        currentChannelTotalFollowers: action.payload
      };
    default:
      return state;
  }
};
