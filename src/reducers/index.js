import { combineReducers } from "redux";
import channelReducer from "./channelReducer";
import authReducer from "./authReducer";
export default combineReducers({
  channel: channelReducer,
  auth: authReducer
});
