import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import ClipCard from "./ClipCard";
import ClipPlayer from "./ClipPlayer";

const ChannelClips = ({ channelId }) => {
  let [clips, setClips] = useState([]);
  let [clipPlayer, openClipPlayer] = useState(false);
  let [clipUrl, setClipUrl] = useState("");

  const handleOpenClip = (clipUrl) => {
    setClipUrl(clipUrl);
    openClipPlayer(true);
  };

  const getClips = async (broadcaster_id) => {
    const access_token = localStorage.getItem("access_token");
    const res = await axios.get(
      `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcaster_id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.data.data;
  };

  useEffect(() => {
    getClips(channelId).then((clips) => {
      console.log(clips);
      setClips(clips);
    });
  }, [channelId]);

  return (
    <div>
      {clipPlayer && <ClipPlayer clipUrl={clipUrl} />}
      Top Clips
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
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  channelId: state.channel.currentChannelInfo.id,
});

export default connect(mapStateToProps, null)(ChannelClips);
