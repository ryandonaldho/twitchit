import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    margin: "0 auto",
  },
  box: {
    width: "100%",
    backgroundColor: "green",
  },
  numbers: {
    textAlign: "center",
  },
}));

const ChannelInfoBar = ({ image, followers, views }) => {
  const classes = useStyles();
  return (
    <div className={classes.box}>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={3}
      >
        <Grid className={classes.numbers} item md={4}>
          {" "}
          <FavoriteIcon fontSize="small" /> {followers.toLocaleString()}
        </Grid>
        <Grid item md={4}>
          {" "}
          <Avatar alt="avatar" src={image} className={classes.small} />
        </Grid>
        <Grid className={classes.numbers} item md={4}>
          {" "}
          <VisibilityIcon fontSize="small" /> {views.toLocaleString()}
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  image: state.channel.currentChannelInfo.profile_image_url,
  followers: state.channel.currentChannelTotalFollowers,
  views: state.channel.currentChannelInfo.view_count,
});

export default connect(mapStateToProps, null)(ChannelInfoBar);
