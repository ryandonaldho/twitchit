import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import chunk from "lodash/chunk";
import axios from "axios";
import UserFollowingCard from "./UserFollowingCard";
import { twitch_helix_api_config } from "../../utils";

const useStyles = makeStyles({
  flex: {
    display: "flex",
    justifyContent: "center",
  },
});

const ChannelFollowing = ({ users, history }) => {
  const classes = useStyles();

  let [followingUsers, setFollowingUsers] = useState([]);

  const getFollowingUsers = async () => {
    console.log(users);
    let splittedUsers = chunk(users, 100);
    // console.log(splittedUsers);
    let allUsers = [];
    for (const userChunk of splittedUsers) {
      let idsString = userChunk.map((user) => user.to_id).join("&id=");
      const tempUsers = await getUsers(idsString);
      allUsers = allUsers.concat(tempUsers.data.data);
    }
    return allUsers;
  };

  useEffect(() => {
    getFollowingUsers().then((users) => {
      //console.log(users);
      setFollowingUsers(users);
    });
  }, [users]);

  const getUsers = async (formattedIds) => {
    const res = await axios.get(
      `https://api.twitch.tv/helix/users?id=${formattedIds}`,
      twitch_helix_api_config
    );
    return res;
  };

  if (!users) {
    return null;
  }

  return (
    <Grid container className={classes.flex} spacing={4}>
      {followingUsers.map((user, index) => (
        <Grid item key={index}>
          <UserFollowingCard user={user} />
        </Grid>
      ))}
      <i aria-hidden="true" style={{ width: "340px", height: "198px" }}></i>
      <i aria-hidden="true" style={{ width: "340px", height: "198px" }}></i>
      <i aria-hidden="true" style={{ width: "340px", height: "198px" }}></i>
      <i aria-hidden="true" style={{ width: "340px", height: "198px" }}></i>
      <i aria-hidden="true" style={{ width: "340px", height: "198px" }}></i>
      <i aria-hidden="true" style={{ width: "340px", height: "198px" }}></i>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  users: state.channel.currentChannelFollowing,
});

export default connect(mapStateToProps, null)(ChannelFollowing);
