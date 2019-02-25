import React, { Component } from "react";
import LoginForm from "./LoginForm/LoginForm.jsx";
import { Layout } from "../Layout/Layout";

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <LoginForm />
            </Layout>
        );
    }
}