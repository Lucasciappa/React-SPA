import React, { useContext } from "react";
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { AuthContext } from "../Auth/AuthContext";

import { LoginScreen } from "../components/login/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {

    const {user} = useContext(AuthContext)

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute exact path="/login" component={LoginScreen} isAuthenticated={user.logged} />
                    <PrivateRoute path="/" component={DashboardRoutes} isAuthenticated={user.logged}/>

                </Switch>
            </div>
        </Router>
    );
}