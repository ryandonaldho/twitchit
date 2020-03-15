import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";

import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
