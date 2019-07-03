import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { connect } from "react-redux";
import ClientUserService from "../../services/ClientUserService";
import { setUser } from "../Login/actions";
import { Redirect } from "react-router-dom";

const _SignupNotification = (props) => {
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    const logInAsGuest = () => {        
        ClientUserService.authenticateUser(
            "guest@user.com", "Skater151"
        ).then(response => {
            if (response.authenticated) {
                props.setUser(response.user);
                setRedirectToReferrer(true);
            }
        })
    }

    return (
        redirectToReferrer ? <Redirect to="log" /> : 
        <div className="signup--notification">
            <p>
                If you don't have an account, <Link to="/signup">register here</Link>, or log in as guest user to try out the app!
            </p>
            <Button type="primary">
                <Link to="/signup">Sign Up</Link>
            </Button>
            <Button onClick={logInAsGuest}>
                Log In As Guest
            </Button>
        </div>
    );
}

let mapStateToProps = (state) => ({
    user: state.user
});
export const SignupNotification = connect(mapStateToProps, { setUser })(_SignupNotification)