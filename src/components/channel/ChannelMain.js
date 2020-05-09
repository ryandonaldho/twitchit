import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TwitchPlayer from "./TwitchPlayer";
import ChannelInfoBar from "./ChannelInfoBar";
import ChannelFollowing from "./ChannelFollowing";
import ChannelClips from "./ChannelClips";
import ChannelVideos from "./ChannelVideos";

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  box: {
    padding: "0px",
  },
}));

const ChannelMain = ({ channel }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
          {/* {props.channelInfo && <ChannelHeaderBar />} */}

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
  );
};

export default ChannelMain;
