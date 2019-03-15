import React, { useState } from "react";
import { Alert, DatePicker, Button, message } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import uuid from "uuid/v4";
import { PasswordInput } from "./PasswordInput";
import ClientUserService from "../../../services/ClientUserService";

export const AccountInfoComponent = (props) => {
    const [inputFields, setInputFields] = useState({});
    const [password, setPassword] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const verifyRecaptcha = () => {
        setRecaptchaVerified(true);
    }

    const handleInputChange = (e) => {
        let target = e.target;
        setInputFields({
            ...inputFields,
            [target.name]: target.value
        })
    };

    const handleDateChange = (field, value) => {
        console.log(field);
        console.log(value);
        setBirthday(value);
    }

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

        if (password !== inputFields['verifyPassword']) {
            errors.push(createError("Passwords do not match."));
        }
        if (!recaptchaVerified) {
            errors.push(createError("Please verify via the reCaptcha."));
        }
        if (birthday === null) {
            errors.push(createError("Please enter your birthday."));
        }

        if (errors.length) {
            setErrorMessages(errors);
            return;
        }

        ClientUserService.createUser(inputFields['email'], password, birthday)
            .then(data => {
                console.log(data);
                message.success("Your account has been created!");
                // setTimeout(function(){
                //     props.goToNextStep();
                // }, 2000)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="signup__accountInfo">
            <div className="signup__errors">{ errorMessages.map(m => m) }</div>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="signup__inputContainer">
                    <label htmlFor="signup--email">Email Address</label>
                    <input name="email" id="signup--email" type="email" required onChange={(e) => handleInputChange(e)} />
                </div>

                <div className="signup__inputContainer">
                    <label htmlFor="signup--password">Password</label>
                    <PasswordInput name="password" id="signup--password" handleInputChange={setPassword} />
                </div>

                <div className="signup__inputContainer">
                    <label htmlFor="signup--verifypassword">Verify Password</label>
                    <input name="verifyPassword" id="signup--verifypassword" type="password"required onChange={(e) => handleInputChange(e)} />
                </div>

                <div className="signup__inputContainer signup__inputContainer--birthday">
                    <label htmlFor="signup--birthday">Enter Birthday</label>
                    <DatePicker format="YYYY-MM-DD" onChange={handleDateChange} />
                </div>

                <div className="signup__inputContainer signup__inputContainer--recaptcha">
                    <ReCAPTCHA 
                        sitekey="6LeFi5cUAAAAALLTRkP3-uF3QtGBuvMEc8nhkc5n"
                        theme="light"
                        onChange={() => setRecaptchaVerified(true)}
                        onExpired={() => setRecaptchaVerified(false)}
                        size="normal" />
                </div>

                <div className="signup__inputContainer">
                    <Button htmlType="submit" type="primary">Create Account</Button>

                </div>
            </form>
        </div>
    );
}