import { combineReducers } from "redux";
import channelReducer from "./channelReducer";
export default combineReducers({
  channel: channelReducer
});
