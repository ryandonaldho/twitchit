import React, { Component, useEffect } from "react";
const EMBED_URL = "https://embed.twitch.tv/embed/v1.js";

// https://stackoverflow.com/questions/48724108/using-twitch-embedded-video-with-reactjs
const TwitchPlayer = props => {
  const loadTwitchPlayer = () => {
    const script = document.createElement("script");
    script.setAttribute("src", EMBED_URL);
    script.addEventListener("load", () => {
      let embed = new window.Twitch.Embed(props.channel, {
        ...props
      });
    });
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadTwitchPlayer();
  });
  return <div id={props.channel} />;
};

TwitchPlayer.defaultProps = {
  width: "940",
  height: "480"
};

export default TwitchPlayer;
