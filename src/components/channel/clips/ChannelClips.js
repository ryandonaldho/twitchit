import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import ClipCard from "./ClipCard";
import ClipPlayer from "./ClipPlayer";
import { set_twitch_helix_api_config } from "../../../utils";
import { Typography } from "@material-ui/core";

const ChannelClips = ({ channelId }) => {
  let [clips, setClips] = useState([]);
  let [clipPlayer, openClipPlayer] = useState(false);
  let [clipUrl, setClipUrl] = useState("");

  let playerRef = useRef(null);

  const handleOpenClip = (clipUrl) => {
    setClipUrl(clipUrl);
    openClipPlayer(true);
    setTimeout(() => {
      console.log(playerRef);
      playerRef.current.scrollIntoView();
    }, 500);
  };

  const getClips = async (broadcaster_id) => {
    const access_token = localStorage.getItem("access_token");
    const res = await axios.get(
      `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcaster_id}`,
      set_twitch_helix_api_config()
    );
    return res.data.data;
  };

  useEffect(() => {
    getClips(channelId).then((clips) => {
      console.log(clips);
      setClips(clips);
    });
  }, [channelId]);

  console.log(playerRef);

  return (
    <div>
      <div ref={playerRef}></div>
      {clipPlayer && <ClipPlayer clipUrl={clipUrl} />}
      <Typography variant="h4"> Top Clips</Typography>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={4}
      >
        {clips.map((clip, index) => (
          <Grid item key={index}>
            <ClipCard clip={clip} handleOpenClip={handleOpenClip} />
          </Grid>
        ))}
        <i aria-hidden="true" style={{ width: "340px", height: "198px" }}></i>
        <i aria-hidden="true" style={{ width: "340px", height: "198px" }}></i>
        <i aria-hidden="true" style={{ width: "340px", height: "198px" }}></i>
        <i aria-hidden="true" style={{ width: "340px", height: "198px" }}></i>
        <i aria-hidden="true" style={{ width: "340px", height: "198px" }}></i>
        <i aria-hidden="true" style={{ width: "340px", height: "198px" }}></i>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  channelId: state.channel.currentChannelInfo.id,
});

export default connect(mapStateToProps, null)(ChannelClips);
