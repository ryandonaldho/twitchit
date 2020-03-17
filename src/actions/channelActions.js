import { SEARCH_CHANNELS, GET_SEARCH_CHANNEL_RESULTS } from "./types";
import axios from "axios";

const config = {
  headers: {
    "Client-ID": "94i0vcuchrod07bvy9ofuz6oiwg0wy",
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

export const getSearchChannelResults = () => async dispatch => {
  //
};
