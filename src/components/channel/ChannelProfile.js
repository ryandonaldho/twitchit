import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getChannelInfo } from "../../actions/channelActions";
import TwitchPlayer from "./TwitchPlayer";

const ChannelProfile = props => {
  const channel = props.match.params.channelname;
  useEffect(() => {
    props.getChannelInfo(channel);
  });
  return (
    <div>
      Profile
      {channel}
      <TwitchPlayer channel={channel} />
    </div>
  );
};

export default connect(null, { getChannelInfo })(ChannelProfile);
