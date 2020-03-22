import React, { Fragment } from "react";
import { connect } from "react-redux";
import ChannelSearchResults from "../channel/ChannelSearchResults";

const Home = ({ channels }) => {
  return <Fragment>{channels !== null && <ChannelSearchResults />}</Fragment>;
};

export default connect(null, {})(Home);
