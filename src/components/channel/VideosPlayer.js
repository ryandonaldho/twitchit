import React from "react";

const VideosPlayer = ({ videoId }) => {
  return (
    <div>
      <iframe
        src={`https://player.twitch.tv/?video=${videoId}&autoplay=true`}
        height="720"
        width="6400"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true"
      ></iframe>
    </div>
  );
};

export default VideosPlayer;
