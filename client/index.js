import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";

// Router
import { Route, Router, Redirect } from "react-router-dom";
import PrivateRoute from "./components/Utilites/PrivateRoute.js";
import { history } from "./store/history";
import RouteTable from "./Routes";

// Redux
import { Provider, connect } from "react-redux";
import { store } from "./store";

// @ts-ignore
import antStyles from '../node_modules/antd/dist/antd.less';
import styles from "./styles/style.scss";
import Header from "./components/Header/Header.jsx";
import { InitialAuthComponent } from "./components/Utilites/InitialAuthCompoment";
import Modal from "./components/Utilites/Modal";
import { Homepage } from "./components/Homepage";
import { MetricsComponent } from "./components/Metrics/index.js";

render(
    <Router history={history}>
        <Provider store={store}>
            <InitialAuthComponent>
                <MetricsComponent>
                    <Header />

                    <div className="contentContainer">
                        <Route exact path="/" component={RouteTable["Login Page"]} />
                        <Route path="/login" component={RouteTable["Login Page"]} />
                        <Route path="/signup" component={RouteTable["Signup Page"]} />
                        <PrivateRoute path="/user" component={RouteTable["AddEditGoalsPage"]} />
                        <PrivateRoute path="/log" component={RouteTable["Log"]} />
                    </div>
                </MetricsComponent>
                
                <Modal />
            </InitialAuthComponent>
        </Provider>
    </Router>,
    document.querySelector("#appContainer")
);