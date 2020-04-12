import React, { Component, useEffect } from "react";
const EMBED_URL = "https://embed.twitch.tv/embed/v1.js";

// https://stackoverflow.com/questions/48724108/using-twitch-embedded-video-with-reactjs
const TwitchPlayer = (props) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", EMBED_URL);
    script.addEventListener("load", () => {
      let embed = new window.Twitch.Embed("twitch-embed", {
        ...props,
      });
    });
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
      // remove previous twitch player
      document.getElementById("twitch-embed").innerHTML = "";
    };
  }, [props.channel]);
  return <div id="twitch-embed" />;
};

TwitchPlayer.defaultProps = {
  width: "700",
  height: "400",
  layout: "video",
};

export default TwitchPlayer;
