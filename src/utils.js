let twitchClientId = process.env.REACT_APP_TWITCH_CLIENT_ID;
export const twitch_api_config = {
  headers: {
    "Client-ID": twitchClientId,
    accept: "application/vnd.twitchtv.v5+json",
  },
};

// for helix endpoints
const access_token = localStorage.getItem("access_token");
export const twitch_helix_api_config = {
  headers: {
    "Client-ID": twitchClientId,
    Authorization: `Bearer ${access_token}`,
    accept: "application/vnd.twitchtv.v5+json",
  },
};
