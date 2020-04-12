import React, { useRef } from "react";
import { connect } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ChannelSearchItem from "../channel/ChannelSearchItem";
import { searchChannels } from "../../actions/channelActions";
import { List } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const SearchBar = ({ searchChannels, channels }) => {
  const classes = useStyles();

  if (channels === null) {
    channels = [];
  }

  const text = useRef("");
  const onChange = (e) => {
    searchChannels(text.current.value);
  };
  return (
    <div className={classes.search}>
      <Autocomplete
        options={channels}
        getOptionLabel={(option) => option.name}
        renderOption={(options) => (
          <List>
            <ChannelSearchItem key={options.display_name} channel={options} />
          </List>
        )}
        renderInput={(params) => (
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

const mapStateToProps = (state) => ({
  channels: state.channel.channels,
});

export default connect(mapStateToProps, { searchChannels })(SearchBar);
