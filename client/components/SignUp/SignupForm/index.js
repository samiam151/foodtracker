import React, { useState, useEffect, Fragment } from "react";
import { Col, Row, message, Alert } from "antd";
import { Loader } from "../../Utilites/Loader";
import { Steps, Button } from "antd";
import uuid from "uuid";
const Step = Steps.Step;

import { connect } from "react-redux";

import { AccountInfoComponent } from "../GetAccountInfo";
import { UpdateWeightGoalsComponent } from "../UpdateGoals";
import { BMRCalculator } from "../BMRCalulator";
import { setSignupProperty, clearSignupProperty } from "../actions";
import ClientUserService from "../../../services/ClientUserService";

const SignupFormComponent = ({setSignupProperty, clearSignupProperty, signup, ...props}) => {
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        ClientUserService.getUsernames()
            .then(names => setSignupProperty('takenNames', names))
            .then(() => setIsLoading(false))
    }, []);

    const createError = (message) => {
        let id = uuid();
        return (
            <Alert key={id} type="error" closable message={message} />
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessages([]);
        let errors = [];

        if (signup.takenNames.includes(signup.email)) {
            errors.push(createError("Email address already in use. Try another one."));
        }

        if (signup.password !== signup.verifyPassword) {
            errors.push(createError("Passwords do not match."));
        }
        if (!signup.recaptchaVerified) {
            errors.push(createError("Please verify via the reCaptcha."));
        }
        if (signup.birthday === null) {
            errors.push(createError("Please enter your birthday."));
        }

        if (errors.length) {
            setErrorMessages(errors);
            return;
        }

        setIsLoading(true);
        ClientUserService.createUser(signup.email, signup.password, signup.birthday)
            .catch(err => {
                console.log(err);
            })
            .then(data => {
                console.log(data);
                message.success("Your account has been created!");
                clearSignupProperty();
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <Fragment>
            {
                isLoading ? <Loader /> : 
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={24}>
                            <div className="signup__errors">{ errorMessages.map(m => m) }</div>
                        </Col>

                        <Col xs={24} md={12} >
                            <AccountInfoComponent setSignupProperty={setSignupProperty} />
                        </Col>
                        <Col xs={24} md={12}>
                            <UpdateWeightGoalsComponent setSignupProperty={setSignupProperty} />
                        </Col>

                        <Col xs={24}>
                            <div className="signup__inputContainer">
                                <Button htmlType="submit" type="primary">Create Account</Button>
                            </div>
                        </Col>
                    </Row>
                </form>
            }    
        </Fragment>
    );
}

export const SignupForm = connect((store) => ({
    signup: store.signup
}), { setSignupProperty, clearSignupProperty })(SignupFormComponent);