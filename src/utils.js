let twitchClientId = process.env.REACT_APP_TWITCH_CLIENT_ID;
export const twitch_api_config = {
  headers: {
    "Client-ID": twitchClientId,
    accept: "application/vnd.twitchtv.v5+json",
  },
};
