import React from "react";
import { connect } from "react-redux";
import ChannelSearchItem from "./ChannelSearchItem";
import { List } from "@material-ui/core";

const ChannelSearchResults = ({ channels }) => {
  console.log(channels);
  if (channels != null && channels.length > 0) {
    return (
      <List>
        {channels.map(channel => (
          <ChannelSearchItem key={channel.display_name} />
        ))}
      </List>
    );
  }
  return (
    <div>
      <h1>Empty</h1>
    </div>
  );
};

const mapStateToProps = state => ({
  channels: state.channel.channels
});

export default connect(mapStateToProps, {})(ChannelSearchResults);
