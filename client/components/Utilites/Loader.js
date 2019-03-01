import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import CircularProgress from '@material-ui/core/CircularProgress';

export const Loader = () => (
    <div className="loaderContainer">
        <CircularProgress className="loader" size={80} />
    </div>
);