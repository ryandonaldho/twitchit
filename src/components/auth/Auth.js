import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import { get_access_token } from "../../actions/authActions";

// use this components to store token in localstorage or state from oauth twitch redirect url
const Auth = props => {
  useEffect(() => {
    const values = queryString.parse(props.location.search);
    props.get_access_token(values.code);
  });
  return <Redirect to="/" />;
};

export default connect(null, { get_access_token })(Auth);
