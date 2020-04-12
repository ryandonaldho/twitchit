import React, { Fragment } from "react";
import TopStreams from "../stream/TopStreams";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    textAlign: "center",
  },
});

const Home = ({}) => {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.header} variant="h5" gutterBottom>
        Top Streams
      </Typography>
      <TopStreams />
    </div>
  );
};

export default Home;
