import React, { Fragment } from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const ChannelSearchItem = ({ channel }) => {
  const onClick = e => {
    console.log("clicked");
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

export default ChannelSearchItem;
