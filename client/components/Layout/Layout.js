import React, { Component } from "react";
import ReactDOM from "react-dom";

export const Layout = (props) => (
    <div className="container">
        {props.children}
    </div>
)