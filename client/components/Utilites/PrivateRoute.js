import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Router, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import {store} from "../../store";

export const PrivateRoute = ({ component: Component, user, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            store.getState().user.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                    pathname: "/login",
                    state: { from: props.location }
                }}/>
        )} />
    );
};


// export default connect((store) => ({
//     user: store.user
// }))(PrivateRoute);