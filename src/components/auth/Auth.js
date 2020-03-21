import React, { useEffect } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import { get_access_token } from "../../actions/authActions";

// use this components to store token in localstorage or state from oauth twitch redirect url
const Auth = props => {
  useEffect(() => {
    const values = queryString.parse(props.location.search);
    props.get_access_token(values.code);
    // console.log(values);
    // if (values.code) {
    //   localStorage.setItem("authorization_code", values.code);
    // }
  });
  return <div>Test</div>;
};

export default connect(null, { get_access_token })(Auth);
