import React from "react";

let hostname = window.location.hostname;

const TwitchChat = ({ channel }) => {
  const url = `https://www.twitch.tv/embed/${channel}/chat?parent=${hostname}`;
  //console.log(url);
  return (
    <iframe
      frameBorder="0"
      scrolling="yes"
      id={channel}
      src={url}
      height="100%"
      width="100%"
    ></iframe>
  );
};

export default TwitchChat;
