import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";

// Router
import { Route, Router } from "react-router-dom";
import { history } from "./store/history";
import RouteTable from "./Routes";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";

// @ts-ignore
import styles from "./styles/style.scss";
import Header from "./components/Header/Header.jsx";

render(
    <Router history={history}>
        <Provider store={store}>
            <Fragment>
                <Header />
                <Route path="/" component={RouteTable["Login Page"]} />
                {/* <Route path="/login" component={RouteTable["Login Page"]} /> */}
            </Fragment>
        </Provider>
    </Router>,
    document.querySelector("#appContainer")
);