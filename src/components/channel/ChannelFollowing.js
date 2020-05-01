import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import chunk from "lodash/chunk";
import axios from "axios";
import UserFollowingCard from "./UserFollowingCard";

const ChannelFollowing = ({ users, history }) => {
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
    const access_token = localStorage.getItem("access_token");
    const res = await axios.get(
      `https://api.twitch.tv/helix/users?id=${formattedIds}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res;
  };

  if (!users) {
    return null;
  }

  console.log(followingUsers);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={4}
    >
      {followingUsers.map((user, index) => (
        <Grid item key={index}>
          <UserFollowingCard user={user} />
        </Grid>
      ))}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  users: state.channel.currentChannelFollowing,
});

export default connect(mapStateToProps, null)(ChannelFollowing);
