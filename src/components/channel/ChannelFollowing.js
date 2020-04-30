import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import chunk from "lodash/chunk";
import axios from "axios";
import SpaceImage from "./starrysky.jpeg";

const useStyles = makeStyles({
  root: {
    width: 308,
    height: 266,
    position: "relative",
  },
  media: {
    height: 198,
  },
});

const empty_offline_image_url = SpaceImage;

const ChannelFollowing = ({ users }) => {
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

  const onClick = (e) => {
    console.log("clicked");
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
          <Card className={classes.root}>
            <CardActionArea onClick={onClick}>
              <CardMedia
                className={classes.media}
                image={
                  user.offline_image_url
                    ? user.offline_image_url
                    : empty_offline_image_url
                }
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="body2"
                  color="textSecondary"
                  component="h6"
                >
                  {user.login}
                </Typography>
                {/* <Typography
                  gutterBottom
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {user.followed_at}
                </Typography> */}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  users: state.channel.currentChannelFollowing,
});

export default connect(mapStateToProps, null)(ChannelFollowing);
