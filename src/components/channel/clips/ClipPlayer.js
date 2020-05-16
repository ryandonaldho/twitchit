import React from "react";

let hostname = window.location.hostname;

const ClipPlayer = ({ clipUrl }) => {
  let clipValue = clipUrl.replace("https://clips.twitch.tv/", "");
  const src = `https://clips.twitch.tv/embed?clip=${clipValue}&parent=${hostname}`;
  return (
    <div>
      <iframe
        src={src}
        height="720"
        width="640"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true"
      ></iframe>
    </div>
  );
};

export default ClipPlayer;
