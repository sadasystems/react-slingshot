import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App.jsx";
import HomePage from "./components/HomePage.jsx";
import FuelSavingsPage from "./containers/FuelSavingsPage.jsx"; // eslint-disable-line import/no-named-as-default
import AboutPage from "./components/AboutPage.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="fuel-savings" component={FuelSavingsPage}/>
        <Route path="about" component={AboutPage}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);
