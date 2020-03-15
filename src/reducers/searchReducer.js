import { SEARCH_CHANNELS } from "../actions/types";

const initialState = {
  channels: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_CHANNELS:
      console.log("passed");
      return {
        ...state,
        channels: action.payload
      };
    default:
      return state;
  }
};
