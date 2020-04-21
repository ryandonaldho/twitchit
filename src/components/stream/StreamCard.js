import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import numeral from "numeral";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 440,
    height: 380,
    position: "relative",
  },
  media: {
    height: 248,
  },
  live_overlay: {
    position: "absolute",
    top: "15px",
    left: "15px",
    color: "white",
    backgroundColor: "red",
    opacity: "0.8",
  },
  viewer_overlay: {
    position: "absolute",
    top: "220px",
    left: "15px",
    color: "white",
    backgroundColor: "black",
    opacity: "0.7",
  },
});

// TODO: onclick to channel page
const StreamCard = ({
  stream: { user_name, title, thumbnail_url, viewer_count, user_id },
  game_name,
  history,
}) => {
  const classes = useStyles();
  const onClick = (e) => {
    console.log("clicked");
    history.push(`/channel/${user_name}`);
    // setCurrentChannelId(user_id);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          className={classes.media}
          image={thumbnail_url}
          title="Contemplative Reptile"
        />
        <Typography className={classes.live_overlay} variant="caption">
          Live
        </Typography>
        <Typography className={classes.viewer_overlay} variant="caption">
          {numeral(viewer_count).format("0.0a")} viewers
        </Typography>
        <CardContent>
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            component="h6"
          >
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {game_name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default withRouter(StreamCard);
