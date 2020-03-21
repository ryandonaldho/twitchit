import { SET_AUTHENTICATION } from "../actions/types";

const initialState = {
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    default:
      return state;
  }
};
