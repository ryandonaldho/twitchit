import { SEARCH_CHANNELS } from "./types";
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
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
