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
        return (
            <header>
                <Layout>
                    <Row type="flex" justify="space-between">
                        <Col xs={6}>
                            <NavSection>
                                <NavLink to="/" name="Home" />
                                { this.props.user.isAuthenticated ? "" : <NavLink to="/login" name="Login" />}
                                {/* { this.props.user.isAuthenticated ? "" : <NavLink to="/signup" name="Sign Up" />}  */}
                                <NavLink to="/log" name="Log" />
                            </NavSection>
                        </Col>
                        
                        <Col xs={6}>
                            { this.props.user.isAuthenticated ? <UserSection /> : ""  }
                        </Col>
                    </Row>
                    
                </Layout>
            </header>
        )
    }
}


let mapState = (store) => {
    return {
        user: store.user
    }
};
export default connect(mapState)(Header);