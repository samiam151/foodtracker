import React, { Component } from "react";
import LoginForm from "./LoginForm/LoginForm.jsx";

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LoginForm />
        );
    }
}