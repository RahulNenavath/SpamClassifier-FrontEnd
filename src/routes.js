import React from "react";
import {Switch, Route} from "react-router-dom"
import MainPanel from './components/main_panel';
import Login from "./components/Logindialog"
import Register from "./components/Registerdialog";

const Routes = () => (
    <Switch>
        <Route exact path = "/" component = {MainPanel} />
        <Route exact path = "/login" component = {Login} />
        <Route exact path = "/register" component = {Register} />
    </Switch>
);

export default Routes;