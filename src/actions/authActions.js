import { SET_AUTHENTICATION } from "./types";
import axios from "axios";

let twitchClientId;
let twitchClientSecret;
let twitchRedirectUri;

twitchClientId = process.env.REACT_APP_TWITCH_CLIENT_ID;
twitchClientSecret = process.env.REACT_APP_TWITCH_CLIENT_SECRET;
twitchRedirectUri = process.env.REACT_APP_TWITCH_REDIRECT_URI;

export const get_access_token = authorization_code => async dispatch => {
  try {
    const res = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${twitchClientId}&client_secret=${twitchClientSecret}&grant_type=authorization_code&code=${authorization_code}&redirect_uri=${twitchRedirectUri}`
    );
    console.log(res);
    dispatch({
      type: SET_AUTHENTICATION,
      payload: true
    });
  } catch (err) {
    console.log(err);
  }
};
