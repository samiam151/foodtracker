import React, { Component } from "react";
import LoginForm from "./LoginForm/LoginForm.jsx";
import { Layout } from "../Layout/Layout";
import { Col, Row, Divider } from "antd";
import { SignupNotification } from "../SignUp/SignupNotification.js";

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <Row gutter={{xs: 0, md: 24}}>
                    <Col xs={24} md={12}>
                        <h2>Login</h2>
                        <Divider />

                        <LoginForm />
                    </Col>

                    <Col xs={24} md={12}>
                        <h2>Sign Up</h2>
                        <Divider />

                        <SignupNotification />
                    </Col>
                </Row>
            </Layout>
        );
    }
}