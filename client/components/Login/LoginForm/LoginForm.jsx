import React, { Component, useState } from "react";
import { render } from "react-dom";
import ClientUserService from "../../../services/ClientUserService";
import { store } from "../../../store/index";
import { connect } from "react-redux";
import { setUser } from "../actions";
import { Redirect } from "react-router-dom";

const LoginForm = ({user, setUser, ...props}) => {
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

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
            }
        })
    }

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
        <form onSubmit={(e) => submitLoginForm(e)}>
            <label htmlFor="username">Username</label>
            <input type="email" name="username" id="username" />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />

            <input type="submit" value="Submit" />
        </form>
    );
}

let mapStateToProps = (state) => ({
    user: state.user
});
export default connect(mapStateToProps, { setUser })(LoginForm)


// class LoginForm extends Component {
//     state = { redirectToReferrer: false };

//     submitLoginForm(e) {
//         e.preventDefault();
//         let target = e.target;

//         let u = target.querySelector("[name='username']").value,
//             p = target.querySelector("[name='password']").value;
        
//         ClientUserService.authenticateUser(u, p).then(response => {
//             if (response.authenticated) {
//                 this.props.setUser(response.user);
//             }
//         })
//     }

//     render() {
//         return (
//             <form onSubmit={(e) => this.submitLoginForm(e)}>
//                 <label htmlFor="username">Username</label>
//                 <input type="email" name="username" id="username" />

//                 <label htmlFor="password">Password</label>
//                 <input type="password" name="password" id="password" />

//                 <input type="submit" value="Submit" />
//             </form>
//         )
//     }
// }
