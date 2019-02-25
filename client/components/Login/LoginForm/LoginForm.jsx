import React, { Component } from "react";
import { render } from "react-dom";
import ClientUserService from "../../../services/ClientUserService";
import { store } from "../../../store/index";
import { connect } from "react-redux";
import { setUser } from "../actions";
class LoginForm extends Component {

    submitLoginForm(e) {
        e.preventDefault();
        let target = e.target;

        let u = target.querySelector("[name='username']").value,
            p = target.querySelector("[name='password']").value;
        
        ClientUserService.authenticateUser(u, p).then(response => {
            if (response.authenticated) {
                this.props.setUser(response.user);
            }
        })
    }

    render() {
        return (
            <form onSubmit={(e) => this.submitLoginForm(e)}>
                <label htmlFor="username">Username</label>
                <input type="email" name="username" id="username" />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />

                <input type="submit" value="Submit" />
            </form>
        )
    }
}

let mapStateToProps = (state) => ({
    user: state.user
});
// let mapDispatchers = dispatch => ({
//     setUser: setUser
// });
export default connect(mapStateToProps, { setUser })(LoginForm)