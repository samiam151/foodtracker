import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

export const NavSection = (props) => (
    <nav className="nav__container">
        {props.children}
    </nav>
);

export const NavLink = (props) => (
    <li className="nav__link">
        <Link to={props.to}>{props.name}</Link>
    </li>
)

NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}