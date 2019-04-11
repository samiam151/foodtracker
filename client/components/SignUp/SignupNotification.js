import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

export const SignupNotification = (props) => {
    return (
        <div className="signup--notification">
            <p>
                If you don't have an accout, <Link to="/signup">register here.</Link>
            </p>
            <Button type="primary">
                <Link to="/signup">Sign Up</Link>
            </Button>
        </div>
    );
}