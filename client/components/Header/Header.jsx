import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ClientUserService from "../../services/ClientUserService";
import { connect } from "react-redux";
import { Layout } from "../Layout/Layout";

import { NavLink, NavSection } from "./Navigation/NavigationComponents";
import { Row, Col } from "antd";
import UserSection from "./UserSection";

class Header extends Component {

    render() {
        let isAuthenticated = Boolean(this.props.user.name);
        return (
            <header>
                <Layout>
                    <Row type="flex" justify="space-between">
                        <Col xs={6}>
                            <NavSection>
                                <NavLink to="/" name="Home" />
                                { isAuthenticated ? "" : <NavLink to="/login" name="Login" />} 
                                {/* <NavLink to="/signup" name="Sign Up" />
                                <NavLink to="/logout" name="Logout" /> */}
                                <NavLink to="/log" name="Log" />
                            </NavSection>
                        </Col>
                        
                        <Col xs={6}>
                            { isAuthenticated ? <UserSection /> : ""  }
                        </Col>
                    </Row>
                    
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