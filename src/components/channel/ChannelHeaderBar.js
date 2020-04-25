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
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    margin: "0 auto",
  },
  box: {
    width: "100%",
    backgroundColor: "yellow",
    top: "0",
    position: "sticky",
  },
  numbers: {
    textAlign: "center",
  },
}));

const ChannelHeaderBar = ({ image, name }) => {
  const classes = useStyles();
  return (
    <div className={classes.box}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid
          container
          item
          xs={4}
          justify="flex-start"
          className={classes.numbers}
        >
          <Grid item xs={6}>
            <Avatar alt="avatar" src={image} className={classes.avatar} />
          </Grid>
          <Grid item xs={6}>
            {name}
          </Grid>
        </Grid>
        <Grid container item xs={4}></Grid>
        <Grid container item xs={4} className={classes.numbers}>
          Right
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  image: state.channel.currentChannelInfo.profile_image_url,
  name: state.channel.currentChannelInfo.display_name,
});

export default connect(mapStateToProps, null)(ChannelHeaderBar);
