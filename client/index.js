/* eslint-disable import/default */
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import routes from "./routes";
import configureStore from "./store/configureStore";

import "./images/favicon.ico";
import "./styles/styles.scss";

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(<Provider store={store}>
    <Router history={history} routes={routes}/>
</Provider>, document.getElementById("application"));
