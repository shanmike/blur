import React from "react";
import { Route, Switch } from "react-router-dom";

import config from "../config";

import Login from "../pages/login";
import Home from "../pages/home";
import Menu from "../pages/menu";
import Matches from "../pages/matches";
import Settings from "../pages/settings";
import Message from "../pages/messages";
import Profile from "../pages/profile";
import NotFound from "../pages/404";

export default (
  <Switch>
    <Route exact path={config.login.page} component={Login} />
    <Route path={config.home.page} component={Home} />
    <Route path={config.menu.page} component={Menu} />
    <Route path={config.settings.page} component={Settings} />
    <Route path={config.profile.page} component={Profile} />
    <Route path={config.matches.page} component={Matches} />
    <Route path={config.messages.page} component={Message} />
    <Route component={NotFound} />
  </Switch>
);
