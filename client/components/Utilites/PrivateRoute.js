import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Router, Redirect, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import {store} from "../../store";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
    console.log(rest);
    return (
        <Route {...rest} render={props => (
            user.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                    pathname: "/login",
                    state: { from: props.location }
                }}/>
        )} />
    );
};


export default withRouter(connect((store) => ({
    user: store.user
}))(PrivateRoute));