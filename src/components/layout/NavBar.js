import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import SearchBar from "./SearchBar";
import { Grid } from "@material-ui/core";
import { revoke_access } from "../../actions/authActions";

const useStyles = makeStyles((theme) => ({
  root: {},
  appbar: {
    backgroundColor: "#6441a5",
  },
  authBtn: {
    float: "right",
    backgroundColor: "#7E5BBE",
  },
  link: {
    textDecoration: "none",
  },
}));

let twitchOauthURL;

if (process.env.NODE_ENV != "production") {
  twitchOauthURL = process.env.REACT_APP_TWITCH_OAUTH_URL;
} else {
  twitchOauthURL = process.env.REACT_APP_TWITCH_OAUTH_URL;
}

const NavBar = ({ isAuthenticated, revoke_access }) => {
  const classes = useStyles();
  console.log(twitchOauthURL);
  const logout = () => {
    const access_token = localStorage.getItem("access_token");
    revoke_access(access_token);
    localStorage.clear();
  };

  //console.log(isAuthenticated);
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.appbar}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Grid item xs>
              <Typography className={classes.title} variant="h6" noWrap>
                <Link className={classes.link} to="/">
                  {" "}
                  Alternative Twitch
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.searchBar}>
              {isAuthenticated ? <SearchBar /> : null}
            </Grid>
            <Grid item xs className={classes.auth}>
              {isAuthenticated ? (
                <Button onClick={logout} className={classes.authBtn}>
                  Logout
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={classes.authBtn}
                  href={twitchOauthURL}
                >
                  Login To Twitch
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { revoke_access })(NavBar);
