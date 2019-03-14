import React, { useState } from "react";
import { Form } from "antd";
import ReCAPTCHA from "react-google-recaptcha";

export const AccountInfoComponent = (props) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [verifyPassword, setVerifyPassword] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);


    const verifyRecaptcha = () => {
        setRecaptchaVerified(true);
    }

    const handleSubmit = () => {
        props.goToNextStep();
    }

    return (
        <div className="signup__accountInfo">
            <form onSubmit={handleSubmit}>
                <label htmlFor="signup--email">Email Address</label>
                <input id="signup--email" type="email"/>

                <label htmlFor="signup--password">Password</label>
                <input id="signup--password" type="password"/>

                <label htmlFor="signup--verifypassword">Verify Password</label>
                <input id="signup--verifypassword" type="password"/>

                <ReCAPTCHA 
                    sitekey="6LeFi5cUAAAAALLTRkP3-uF3QtGBuvMEc8nhkc5n"
                    theme="light"
                    onChange={verifyRecaptcha}
                    size="normal" />

                <input type="submit" value="Create Account" />
            </form>
        </div>
    );
}

// process.env.RECAPTCHA_SITE_KEY