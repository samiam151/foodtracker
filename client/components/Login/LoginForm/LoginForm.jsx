import React, { Component } from "react";
import { render } from "react-dom";
import ClientUserService from "../../../services/ClientUserService";
import { store } from "../../../store/index";
import { connect } from "react-redux";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.submitLoginForm = this.submitLoginForm.bind(this);
        
    }

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
            <form onSubmit={this.submitLoginForm}>
                <p>React</p>
                <label htmlFor="username">Username</label>
                <input type="email" name="username" id="username" />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />

                <input type="submit" value="Submit" />
            </form>
        )
    }
}

let mapState = (state) => {
    return {
        user: state.user
    }
};
let mapDispatch = dispatch => ({
    setUser: (user) => dispatch({user: user, type: "USER__UPDATE"})
});
export default connect(mapState, mapDispatch)(LoginForm)