import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
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

const VideoCard = ({ video, handleOpenVideo }) => {
  const classes = useStyles();

  const handleClick = () => {
    console.log(video.id);
    handleOpenVideo(video.id);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <CardMedia className={classes.media} image={video.thumbnail_url} />
        <CardContent>
          <Typography noWrap variant="subtitle1">
            {video.title}
          </Typography>
          <Typography variant="p">{video.user_name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default withRouter(VideoCard);
