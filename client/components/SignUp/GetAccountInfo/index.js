import React, { useState, useEffect } from "react";
import { Alert, DatePicker, Button, message } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import uuid from "uuid/v4";
import { PasswordInput } from "./PasswordInput";
import ClientUserService from "../../../services/ClientUserService";

export const AccountInfoComponent = (props) => {

    const handleInputChange = (e) => {
        let target = e.target;
        props.setSignupProperty(target.name, target.value)
    };

    return (
        <div className="signup__accountInfo">
            <div className="signup__inputContainer">
                <label htmlFor="signup--email">Email Address</label>
                <input name="email" id="signup--email" type="email" required onChange={(e) => handleInputChange(e)} />
            </div>

            <div className="signup__inputContainer">
                <label htmlFor="signup--password">Password</label>
                <PasswordInput name="password" id="signup--password" handleInputChange={props.setSignupProperty} />
            </div>

            <div className="signup__inputContainer">
                <label htmlFor="signup--verifypassword">Verify Password</label>
                <input name="verifyPassword" id="signup--verifypassword" type="password"required onChange={(e) => handleInputChange(e)} />
            </div>

            <div className="signup__inputContainer signup__inputContainer--birthday">
                <label htmlFor="signup--birthday">Enter Birthday</label>
                <DatePicker format="YYYY-MM-DD" onChange={(field, value) => props.setSignupProperty('birthday', value)} />
            </div>

            <div className="signup__inputContainer signup__inputContainer--recaptcha">
                <ReCAPTCHA 
                    sitekey="6LeFi5cUAAAAALLTRkP3-uF3QtGBuvMEc8nhkc5n"
                    theme="light"
                    onChange={() => props.setSignupProperty('recaptchaVerified', true)}
                    onExpired={() => props.setSignupProperty('recaptchaVerified', false)}
                    size="normal" />
            </div>
        </div>
    );
}