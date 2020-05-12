import {
  SEARCH_CHANNELS,
  SET_CHANNEL_INFO,
  SET_CURRENT_CHANNEL_ID,
  SET_CURRENT_CHANNEL_FOLLOWING,
  SET_CHANNEL_FOLLOWERS_COUNT,
} from "./types";
import axios from "axios";
import { twitch_api_config } from "../utils";
import { set_twitch_helix_api_config } from "../utils";

export const searchChannels = (channel) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://api.twitch.tv/kraken/search/channels?query=${channel}`,
      twitch_api_config
    );
    dispatch({
      type: SEARCH_CHANNELS,
      payload: res.data.channels,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getChannelInfo = (channel) => async (dispatch) => {
  try {
    // console.log(channel);
    // console.log(localStorage.getItem("access_token"));
    const access_token = localStorage.getItem("access_token");
    const res = await axios.get(
      `https://api.twitch.tv/helix/users?login=${channel}`,
      set_twitch_helix_api_config()
    );
    getChannelFollowing(res.data.data[0].id);
    dispatch({
      type: SET_CHANNEL_INFO,
      payload: res.data.data[0],
    });
    //console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const getChannelFollowing = (channelId) => async (dispatch) => {
  try {
    let cursor = "";
    let res;
    let results = [];
    console.log("hello");
    // gets all users the the channel is following and put into a array
    do {
      if (cursor == "") {
        res = await axios.get(
          `https://api.twitch.tv/helix/users/follows?from_id=${channelId}&first=100`,
          set_twitch_helix_api_config()
        );
      } else {
        res = await axios.get(
          `https://api.twitch.tv/helix/users/follows?from_id=${channelId}&first=100&after=${cursor}`,
          set_twitch_helix_api_config()
        );
      }
      results = results.concat(res.data.data);
      cursor = res.data.pagination.cursor;

      //console.log(res.data.data);
    } while (cursor != null);
    dispatch({
      type: SET_CURRENT_CHANNEL_FOLLOWING,
      payload: results,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getTotalFollowers = (channelId) => async (dispatch) => {
  try {
    let res = await axios.get(
      `https://api.twitch.tv/helix/users/follows?to_id=${channelId}`,
      set_twitch_helix_api_config()
    );
    // console.log(res);
    dispatch({
      type: SET_CHANNEL_FOLLOWERS_COUNT,
      payload: res.data.total,
    });
  } catch (err) {
    console.error(err);
  }
};

export const setCurrentChannelId = (channelId) => async (dispatch) => {
  console.log(channelId);
  try {
    dispatch({
      type: SET_CURRENT_CHANNEL_ID,
      payload: channelId,
    });
  } catch (err) {
    console.error(err);
  }
};

export function getCombinedData(channel) {
  return (dispatch, getState) => {
    console.log(getState());
    return dispatch(getChannelInfo(channel)).then(() => {
      const channelId = getState().channel.currentChannelInfo.id;
      dispatch(getTotalFollowers(channelId));
      dispatch(getChannelFollowing(channelId));
    });
  };
}
