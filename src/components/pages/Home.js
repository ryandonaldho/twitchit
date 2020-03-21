import React, { Fragment } from "react";
import SearchBar from "../layout/SearchBar";
import NavBar from "../layout/NavBar";
import ChannelSearchResults from "../channel/ChannelSearchResults";

const Home = () => {
  return (
    <Fragment>
      <ChannelSearchResults />
    </Fragment>
  );
};

export default Home;
