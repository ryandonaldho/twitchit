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
      {value === index && <Box p={3}>{children}</Box>}
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
}));

const ChannelMain = ({ channel }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [player, openPlayer] = useState(true);
  const [playerBtnText, setplayerBtnText] = useState("Close");
  const togglePlayer = () => {
    openPlayer(!player);
    playerBtnText === "Open"
      ? setplayerBtnText("Close")
      : setplayerBtnText("Open");
  };

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
            <LinkTab label="Followers" {...a11yProps(3)} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid
          container
          className={classes.grid}
          spacing={3}
          direction="row"
          justify="center"
          alignItems="center"
        >
          {/* {props.channelInfo && <ChannelHeaderBar />} */}

          <Grid item xs={12}>
            <button onClick={togglePlayer}>{playerBtnText} Stream</button>
            {player && <TwitchPlayer channel={channel} />}
          </Grid>
          <Grid item xs={12}>
            <ChannelInfoBar />
          </Grid>
          <Grid item xs={6}>
            Test 2
          </Grid>
          <Grid item xs={6}>
            Test 3
          </Grid>
          <Grid item xs={6}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            rerum, eligendi asperiores est accusantium commodi molestiae
            voluptates voluptatem, dolor eaque delectus illum hic optio quidem
            natus alias, suscipit facilis neque deserunt! Deserunt quibusdam
            numquam eos recusandae adipisci laudantium perferendis accusamus
            inventore animi ipsa veniam itaque, provident amet similique
            incidunt placeat rerum assumenda ullam natus odit! Facilis assumenda
            consequuntur, sint esse dignissimos ipsum necessitatibus ratione
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Page Twouij
      </TabPanel>
      <TabPanel value={value} index={2}>
        Page Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Page Three
      </TabPanel>
    </div>
  );
};

export default ChannelMain;
