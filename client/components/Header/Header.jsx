import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ClientUserService from "../../services/ClientUserService";
import { connect } from "react-redux";

// class Header extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render({user}) {
//         return (
//             <header>
//                 <Link to="/">Home</Link>
//                     <Link to="/login">Login</Link>
//                     <Link to="/signup">Sign Up</Link>
//                     <Link to="/logout">Logout</Link>
//                     <p>{ClientUserService.isAuthenticated() ? "authenticated" : "not authenticated"}</p>
//                     <p>{user}</p>
//             </header>
//         )
//     }
// }

const Header = ({user}) => (
    <header>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/logout">Logout</Link>
        <p>{user}</p>
    </header>
);

let mapState = (state) => {
    return {
        user: state.user
    }
};
export default connect(mapState)(Header);