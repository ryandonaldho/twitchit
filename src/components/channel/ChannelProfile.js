import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getChannelInfo,
  getChannelFollowing,
  getTotalFollowers,
} from "../../actions/channelActions";
import TwitchPlayer from "./TwitchPlayer";
import ChannelInfo from "./ChannelInfo";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

// TODO Create Split Pane for chat/video like twitch

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: "20px",
  },
}));

const ChannelProfile = (props) => {
  const classes = useStyles();

  const channel = props.match.params.channelname;

  const [player, openPlayer] = useState(true);
  const [playerBtnText, setplayerBtnText] = useState("Close");

  const togglePlayer = () => {
    openPlayer(!player);
    playerBtnText === "Open"
      ? setplayerBtnText("Close")
      : setplayerBtnText("Open");
  };

  useEffect(() => {
    props.getChannelInfo(channel);
    props.getChannelFollowing(props.channelId);
    props.getTotalFollowers(props.channelId);
  }, [props.channelId]);
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        {props.channelInfo && <ChannelInfo />}

        <Grid item xs={12}>
          <button onClick={togglePlayer}>{playerBtnText} Stream</button>
          {player && <TwitchPlayer channel={channel} />}
        </Grid>
        <Grid item xs={6}>
          Test 1
        </Grid>
        <Grid item xs={6}>
          Test 2
        </Grid>
        <Grid item xs={6}>
          Test 3
        </Grid>
        <Grid item xs={6}>
          Test 4
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  channelId: state.channel.currentChannelId,
  channelInfo: state.channel.currentChannelInfo,
});

export default connect(mapStateToProps, {
  getChannelInfo,
  getChannelFollowing,
  getTotalFollowers,
})(ChannelProfile);
