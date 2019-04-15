import React, { Component, useState } from "react";
import { render } from "react-dom";
import ClientUserService from "../../../services/ClientUserService";
import { store } from "../../../store/index";
import { connect } from "react-redux";
import { setUser } from "../actions";
import { Redirect } from "react-router-dom";
import { Button, Alert } from "antd";
import { Padding } from "../../Utilites/Padding";

const LoginForm = ({user, setUser, ...props}) => {
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const { from } = { from: { pathname: "/" } };
    const submitLoginForm = (e) => {
        e.preventDefault();
        let target = e.target;

        let u = target.querySelector("[name='username']").value,
            p = target.querySelector("[name='password']").value;
        
        ClientUserService.authenticateUser(u, p).then(response => {
            if (response.authenticated) {
                setUser(response.user);
                setRedirectToReferrer(true);
            } else {
                console.log(response);
                setErrorMessage(response.message);
            }
        })
    }

    return (

        redirectToReferrer ? <Redirect to="log" /> : 
        <form onSubmit={(e) => submitLoginForm(e)}>
            {
                errorMessage ? <Alert
                    message={errorMessage}
                    type="error"
                    closable
                    /> : ""
            }

            <label htmlFor="username">Username</label>
            <input type="email" name="username" id="username" />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <Padding xAmount={14} unit="px">
                <Button type="primary" htmlType="submit">Log In</Button>
            </Padding>
        </form>
    );
}

let mapStateToProps = (state) => ({
    user: state.user
});
export default connect(mapStateToProps, { setUser })(LoginForm)