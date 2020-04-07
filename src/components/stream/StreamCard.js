import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import numeral from "numeral";

const useStyles = makeStyles({
  root: {
    width: 440,
    height: 400,
    position: "relative"
  },
  media: {
    height: 248
  },
  live_overlay: {
    position: "absolute",
    top: "15px",
    left: "15px",
    color: "white",
    backgroundColor: "red",
    opacity: "0.8"
  },
  viewer_overlay: {
    position: "absolute",
    top: "220px",
    left: "15px",
    color: "white",
    backgroundColor: "black",
    opacity: "0.7"
  }
});

// TODO: add game name & tags?
//       onclick to channel page
const StreamCard = ({
  stream: { user_name, title, thumbnail_url, viewer_count, game_id }
}) => {
  const classes = useStyles();
  console.log(user_name);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={thumbnail_url}
          title="Contemplative Reptile"
        />
        <Typography className={classes.live_overlay} variant="body">
          Live
        </Typography>
        <Typography className={classes.viewer_overlay} variant="body">
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default StreamCard;
