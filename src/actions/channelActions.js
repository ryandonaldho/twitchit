import {
  SEARCH_CHANNELS,
  SET_CHANNEL_INFO,
  SET_CURRENT_CHANNEL_ID,
  SET_CURRENT_CHANNEL_FOLLOWING,
  SET_CHANNEL_FOLLOWERS_COUNT
} from "./types";
import axios from "axios";

let twitchClientId;

twitchClientId = process.env.REACT_APP_TWITCH_CLIENT_ID;

//TODO Move to global headers or import from config file?
const config = {
  headers: {
    "Client-ID": twitchClientId,
    accept: "application/vnd.twitchtv.v5+json"
  }
};

export const searchChannels = channel => async dispatch => {
  try {
    const res = await axios.get(
      `https://api.twitch.tv/kraken/search/channels?query=${channel}`,
      config
    );
    dispatch({
      type: SEARCH_CHANNELS,
      payload: res.data.channels
    });
  } catch (err) {
    console.log(err);
  }
};

export const getChannelInfo = channel => async dispatch => {
  try {
    // console.log(channel);
    // console.log(localStorage.getItem("access_token"));
    const access_token = localStorage.getItem("access_token");
    const res = await axios.get(
      `https://api.twitch.tv/helix/users?login=${channel}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    );
    dispatch({
      type: SET_CHANNEL_INFO,
      payload: res.data.data[0]
    });
    //console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const getChannelFollowing = channelId => async dispatch => {
  try {
    let cursor = "";
    let res;
    let results = [];
    // gets all users the the channel is following and put into a array
    do {
      if (cursor == "") {
        res = await axios.get(
          `https://api.twitch.tv/helix/users/follows?from_id=${channelId}&first=100`,
          config
        );
      } else {
        res = await axios.get(
          `https://api.twitch.tv/helix/users/follows?from_id=${channelId}&first=100&after=${cursor}`,
          config
        );
      }
      results = results.concat(res.data.data);
      cursor = res.data.pagination.cursor;

      //console.log(res.data.data);
    } while (cursor != null);
    dispatch({
      type: SET_CURRENT_CHANNEL_FOLLOWING,
      payload: results
    });
  } catch (err) {
    console.error(err);
  }
};

export const getTotalFollowers = channelId => async dispatch => {
  try {
    let res = await axios.get(
      `https://api.twitch.tv/helix/users/follows?to_id=${channelId}`,
      config
    );
    console.log(res);
    dispatch({
      type: SET_CHANNEL_FOLLOWERS_COUNT,
      payload: res.data.total
    });
  } catch (err) {
    console.error(err);
  }
};

export const setCurrentChannelId = channelId => async dispatch => {
  console.log(channelId);
  try {
    dispatch({
      type: SET_CURRENT_CHANNEL_ID,
      payload: channelId
    });
  } catch (err) {
    console.error(err);
  }
};
