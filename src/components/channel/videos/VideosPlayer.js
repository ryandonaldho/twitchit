import React from "react";
import { makeStyles } from "@material-ui/core/styles";

let hostname = window.location.hostname;

const useStyles = makeStyles({
  videoPlayer: {
    height: "85vh",
  },
});

const VideosPlayer = ({ videoId }) => {
  const classes = useStyles();

  return (
    <div className={classes.videoPlayer}>
      <iframe
        src={`https://player.twitch.tv/?video=${videoId}&parent=${hostname}&autoplay=true`}
        height="100%"
        width="100%"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true"
      ></iframe>
    </div>
  );
};

export default VideosPlayer;
