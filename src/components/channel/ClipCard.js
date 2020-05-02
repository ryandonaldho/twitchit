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

const ClipCard = ({ clip, handleOpenClip }) => {
  const classes = useStyles();

  const handleClick = () => {
    handleOpenClip(clip.url);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <CardMedia className={classes.media} image={clip.thumbnail_url} />
        <CardContent>{clip.broadcaster_name}</CardContent>
      </CardActionArea>
    </Card>
  );
};

export default withRouter(ClipCard);
