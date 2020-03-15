import { SEARCH_CHANNELS } from "./types";
import axios from "axios";

const config = {
  headers: {
    "Client-ID": "94i0vcuchrod07bvy9ofuz6oiwg0wy",
    accept: "application/vnd.twitchtv.v5+json"
  }
};

export const searchChannels = channel => async dispatch => {
  console.log(channel);
  try {
    const res = await axios.get(
      `https://api.twitch.tv/kraken/search/channels?query=${channel}`,
      config
    );
    console.log(res.data.channels);
    dispatch({
      type: SEARCH_CHANNELS,
      payload: res.data.channels
    });
  } catch (err) {
    console.log(err);
  }
};
