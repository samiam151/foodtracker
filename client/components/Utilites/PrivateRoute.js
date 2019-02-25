import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Router, Redirect } from "react-router-dom";

import {store} from "../../store/index";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            store.getState().user.user ? (
                <Component {...props} />
            ) : 
            (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);
