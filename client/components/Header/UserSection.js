import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Menu, Dropdown, Icon } from "antd";
import { unsetUser } from "../Login/actions";
import {UserMenu} from "./UserMenu";

const UserSection = ({user, ...props}) => (
    <div className="userSection">
        <span className="userSection__loggedInAs">Logged in as <strong>{user.name}</strong></span>
        <Dropdown overlay={UserMenu}>
            <a className="ant-dropdown-link" href="#">
                <Icon type="user" />
            </a>
        </Dropdown>
    </div>
);

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}
export default connect(mapStateToProps)(UserSection);