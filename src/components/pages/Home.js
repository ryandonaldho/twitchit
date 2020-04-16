import React from "react";
import TopStreams from "../stream/TopStreams";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    textAlign: "center",
  },
});

const Home = (props) => {
  const classes = useStyles();
  console.log(props.location.state);

  return (
    <div>
      {props.location.state === false && (
        <Alert severity="error">
          Please login, you are currently not logged in
        </Alert>
      )}
      <Typography className={classes.header} variant="h5" gutterBottom>
        Top Streams
      </Typography>
      <TopStreams />
    </div>
  );
};

export default Home;
