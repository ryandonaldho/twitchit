import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCombinedData } from "../../../actions/channelActions";
import TwitchChat from "./TwitchChat";
import ChannelInfoBar from "./ChannelInfoBar";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TwitchPlayer from "./TwitchPlayer";
import ChannelFollowing from "../following/ChannelFollowing";
import ChannelClips from "../clips/ChannelClips";
import ChannelVideos from "../videos/ChannelVideos";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: "20px",
  },
  main: {
    width: "100%",
    height: "100%",
  },
  chatDiv: {
    right: "0",
    width: "20%",
    height: "90%",
    position: "fixed",
    bottom: "0",
    overflow: "hidden",
  },
  mainDiv: {
    overflowY: "scroll",
    overflowX: "hidden",
    height: "95vh",
    width: "80%",
  },
  box: {
    padding: "0px",
  },
}));

// TODO in useEffect teardown clear state to avoid showing briefly previous state
const ChannelMain = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const channel = props.match.params.channelname;
  useEffect(() => {
    props.getCombinedData(channel);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [channel]);

  if (!props.channelInfo) {
    return null;
  } else {
    return (
      <div className={classes.main}>
        <div className={classes.chatDiv}>
          <TwitchChat channel={channel} />{" "}
        </div>
        <div className={classes.mainDiv}>
          <div className={classes.root}>
            <AppBar position="sticky">
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  News
                </Typography>
                <Tabs
                  variant="fullWidth"
                  value={value}
                  onChange={handleChange}
                  aria-label="nav tabs example"
                >
                  <LinkTab label="Home" {...a11yProps(0)} />
                  <LinkTab label="Videos" {...a11yProps(1)} />
                  <LinkTab label="Clips" {...a11yProps(2)} />
                  <LinkTab label="Following" {...a11yProps(3)} />
                </Tabs>
              </Toolbar>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Grid
                container
                spacing={0}
                className={classes.tabPanel}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <TwitchPlayer channel={channel} />
                </Grid>
                <Grid item xs={12}>
                  <ChannelInfoBar />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={value} index={1}>
              <ChannelVideos />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ChannelClips />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <ChannelFollowing />
            </TabPanel>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  channelId: state.channel.currentChannelId,
  channelInfo: state.channel.currentChannelInfo,
});

export default connect(mapStateToProps, {
  getCombinedData,
})(ChannelMain);
