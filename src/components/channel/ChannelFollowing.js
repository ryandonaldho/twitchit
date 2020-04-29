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

const ChannelFollowing = ({ users }) => {
  const classes = useStyles();

  const [followingUsers, setFollowingUsers] = useState([]);

  useEffect(() => {
    console.log(users);
    let splittedUsers = chunk(users, 100);
    console.log(splittedUsers);
    splittedUsers.forEach((userChunk) => {
      let idsString = userChunk.map((user) => user.to_id).join("&id=");
      console.log(idsString);
      getUsers(idsString).then((res) => {
        console.log(res.data.data);
        setFollowingUsers(followingUsers.concat(res.data.data));
      });
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
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
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
