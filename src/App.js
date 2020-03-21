import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import NavBar from "./components/layout/NavBar";
import ChannelProfile from "./components/pages/ChannelProfile";
import Auth from "./components/auth/Auth";
import NotFound from "./components/pages/NotFound";

import PrivateRoute from "./components/auth/PrivateRoute";

import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

function App() {
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
