import React, {useState} from "react";
import ReactPasswordStrength from 'react-password-strength';


export const PasswordInput = ({handleInputChange, ...props}) => {
    const handleChange = ({isValid, password}) => {
        if (isValid) {
            handleInputChange('password', password);
        }
    }

    return (
        <ReactPasswordStrength 
            className={props['className'] || "password-input"}
            minLength={7}
            minScore={2}
            scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
            changeCallback={handleChange}
            inputProps={{ name: "password" }}
        />
    );
}