import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import { connect } from "react-redux";
import { setCurrentChannelId } from "../../actions/channelActions";

const ChannelSearchItem = ({ channel, history, setCurrentChannelId }) => {
  const onClick = (e) => {
    //console.log(channel.name);
    history.push(`/channel/${channel.name}`);
    setCurrentChannelId(channel._id);
  };

  return (
    <Fragment>
      <ListItem button onClick={onClick}>
        <ListItemAvatar>
          <Avatar alt={channel.name} src={channel.logo}></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={channel.display_name}
          secondary={channel.description}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </Fragment>
  );
};

export default connect(null, { setCurrentChannelId })(
  withRouter(ChannelSearchItem)
);
