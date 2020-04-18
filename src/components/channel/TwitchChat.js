import React from "react";

const TwitchChat = ({ channel }) => {
  const url = `https://www.twitch.tv/embed/${channel}/chat?parent=localhost`;
  console.log(url);
  return (
    <div>
      <h1>Player</h1>
      <iframe
        frameborder="0"
        scrolling="yes"
        id={channel}
        src={url}
        height="875"
        width="700"
      ></iframe>
    </div>
  );
};

export default TwitchChat;
