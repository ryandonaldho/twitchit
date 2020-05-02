import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import ClipCard from "./ClipCard";

const ChannelClips = ({ channelId }) => {
  let [clips, setClips] = useState([]);

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
            <ClipCard clip={clip} />
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
