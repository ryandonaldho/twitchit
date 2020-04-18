import React from "react";

const TwitchChat = ({ channel }) => {
  const url = `https://www.twitch.tv/embed/${channel}/chat?parent=localhost`;
  console.log(url);
  return (
    <iframe
      frameborder="0"
      scrolling="yes"
      id={channel}
      src={url}
      height="100%"
      width="100%"
    ></iframe>
  );
};

export default TwitchChat;
