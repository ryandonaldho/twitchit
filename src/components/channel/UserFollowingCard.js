import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import SpaceImage from "./starrysky.jpeg";
import Avatar from "@material-ui/core/Avatar";
import { withRouter } from "react-router-dom";

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
const UserFollowingCard = ({ user, history }) => {
  const classes = useStyles();
  const onClick = (e) => {
    history.push(`/channel/${user.login}`);
    // setCurrentChannelId(user_id);
  };

  const handleOffilineImage = (image) => {
    if (image === "") {
      return empty_offline_image_url;
    } else {
      // use a smaller image
      image = image.replace("1920", "308");
      image = image.replace("1080", "198");
      return image;
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          className={classes.media}
          image={handleOffilineImage(user.offline_image_url)}
        />
        <div
          style={{
            textAlign: "center",
            top: "50%",
            left: "50%",
            position: "absolute",
          }}
        >
          <Avatar src={user.profile_image_url} />
          <Typography
            style={{ color: "white" }}
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
        </div>
      </CardActionArea>
    </Card>
  );
};

export default withRouter(UserFollowingCard);
