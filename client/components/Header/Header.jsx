import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ClientUserService from "../../services/ClientUserService";
import { connect } from "react-redux";
import { Layout } from "../Layout/Layout";

import { NavLink, NavSection } from "./Navigation/NavigationComponents";

class Header extends Component {

    render() {
        let isAuthenticated = Boolean(this.props.user.name);
        return (
            <header>
                <Layout>
                    <NavSection>
                        <NavLink to="/" name="Home" />
                        { isAuthenticated ? "" : <NavLink to="/login" name="Login" />} 
                        {/* <NavLink to="/signup" name="Sign Up" />
                        <NavLink to="/logout" name="Logout" /> */}
                        <NavLink to="/log" name="Log" />
                    </NavSection>
                    
                    { isAuthenticated ? `Logged in as ${this.props.user.name}` : ""  }
                </Layout>
            </header>
        )
    }
}


let mapState = ({user}) => {
    return {
        user: user
    }
};
export default connect(mapState)(Header);