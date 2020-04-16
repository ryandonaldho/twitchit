import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const PrivateRoute = ({ children, isAuthenticated }) => (
  <Fragment>
    {isAuthenticated === true ? (
      children
    ) : (
      <Redirect
        to={{
          pathname: "",
          state: isAuthenticated,
        }}
      />
    )}
  </Fragment>
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(PrivateRoute);
