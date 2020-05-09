import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCombinedData } from "../../actions/channelActions";
import TwitchChat from "./TwitchChat";
import ChannelHeaderBar from "./ChannelHeaderBar";
import ChannelInfoBar from "./ChannelInfoBar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import SplitPane, { Pane } from "react-split-pane";
import ChannelMain from "./ChannelMain";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: "20px",
  },
  main: {
    width: "100%",
    height: "100%",
  },
  chatDiv: {
    right: "0",
    width: "20%",
    height: "90%",
    position: "fixed",
    bottom: "0",
    overflow: "hidden",
  },
  mainDiv: {
    overflowY: "scroll",
    overflowX: "hidden",
    height: "95vh",
    width: "80%",
  },
}));

// TODO in useEffect teardown clear state to avoid showing briefly previous state
const ChannelProfile = (props) => {
  const classes = useStyles();

  const channel = props.match.params.channelname;
  useEffect(() => {
    props.getCombinedData(channel);
    console.error("called", channel);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [channel]);
  return (
    <div className={classes.main}>
      <div className={classes.chatDiv}>
        <TwitchChat channel={channel} />{" "}
      </div>
      <div className={classes.mainDiv}>
        {props.channelInfo && <ChannelMain channel={channel} />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  channelId: state.channel.currentChannelId,
  channelInfo: state.channel.currentChannelInfo,
});

export default connect(mapStateToProps, {
  getCombinedData,
})(ChannelProfile);
