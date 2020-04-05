import React, { useRef } from "react";
import { connect } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import ChannelSearchItem from "../channel/ChannelSearchItem";
import { searchChannels } from "../../actions/channelActions";
import { List } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  search: {
    width: "25%",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0
    // width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(1),
    //   width: "auto"
    // }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}));

const SearchBar = ({ searchChannels, channels }) => {
  const classes = useStyles();

  if (channels === null) {
    channels = [];
  }

  const text = useRef("");
  const onChange = e => {
    searchChannels(text.current.value);
  };
  return (
    // <div className={classes.search}>
    //   <div className={classes.searchIcon}>
    //     <SearchIcon />
    //   </div>
    //   <InputBase
    //     placeholder="Search…"
    //     classes={{
    //       root: classes.inputRoot,
    //       input: classes.inputInput
    //     }}
    //     inputProps={{ "aria-label": "search" }}
    //     onChange={onChange}
    //     inputRef={text}
    //   />
    // </div>
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <Autocomplete
        options={channels}
        getOptionLabel={option => option.name}
        renderOption={options => (
          <List>
            <ChannelSearchItem key={options.display_name} channel={options} />
          </List>
        )}
        renderInput={params => (
          <TextField
            {...params}
            label="Search Channel"
            margin="normal"
            variant="outlined"
            onChange={onChange}
            inputRef={text}
          />
        )}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  channels: state.channel.channels
});

export default connect(mapStateToProps, { searchChannels })(SearchBar);
