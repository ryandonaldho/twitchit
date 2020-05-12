import React, { Fragment } from "react";
import TopStreams from "../stream/TopStreams";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles({
  header: {
    textAlign: "center",
  },
});

const Home = ({ isAuthenticated }) => {
  const classes = useStyles();
  //console.log(props.location.state);

  return (
    <Fragment>
      {isAuthenticated ? (
        <Fragment>
          {" "}
          <Typography className={classes.header} variant="h5" gutterBottom>
            Top Streams
          </Typography>
          <TopStreams />
        </Fragment>
      ) : (
        <Alert severity="error">
          Please login, you are currently not logged in
        </Alert>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(Home);
