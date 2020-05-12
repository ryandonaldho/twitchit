import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import chunk from "lodash/chunk";
import axios from "axios";
import UserFollowingCard from "./UserFollowingCard";
import { set_twitch_helix_api_config } from "../../utils";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  flex: {
    display: "flex",
    justifyContent: "center",
  },
});

const ChannelFollowing = ({ users, history }) => {
  const classes = useStyles();

  let [followingUsers, setFollowingUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    getFollowingUsers().then((users) => {
      setFollowingUsers(users);
      setLoading(false);
    });
  }, [users]);

  const getUsers = async (formattedIds) => {
    const res = await axios.get(
      `https://api.twitch.tv/helix/users?id=${formattedIds}`,
      set_twitch_helix_api_config()
    );
    return res;
  };

  if (!users) {
    return null;
  }

  return (
    <Grid container className={classes.flex} spacing={4}>
      {loading && (
        <Skeleton animation="wave" variant="rect" width={1920} height={1080} />
      )}
      {!loading &&
        followingUsers.map((user, index) => (
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
