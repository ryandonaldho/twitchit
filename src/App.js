import React, { Fragment } from "react";
import { connect } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import NavBar from "./components/layout/NavBar";
import ChannelProfile from "./components/channel/ChannelProfile";
import Auth from "./components/auth/Auth";
import NotFound from "./components/pages/NotFound";

import PrivateRoute from "./components/auth/PrivateRoute";

import { check_authentication } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

function App() {
  const access_token = localStorage.getItem("access_token");
  store.dispatch(check_authentication(access_token));
  // check if access_token is still valid

  // if it is dispatch state isAuthenticated to true and refresh to token else set isAuthenticated to false

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/auth" component={Auth}></Route>
            <PrivateRoute>
              <Route
                exact
                path="/channel/:channelname"
                component={ChannelProfile}
              ></Route>
            </PrivateRoute>
            <Route component={NotFound}></Route>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
