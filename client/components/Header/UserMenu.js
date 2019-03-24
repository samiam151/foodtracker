import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Dropdown, Icon } from "antd";
import { unsetUser } from "../Login/actions";

export const UserMenu = (props) => {
    return (
        <Menu>
        <Menu.Item>
                <Link to="/user">Account</Link>
            </Menu.Item>
            <Menu.Item>
                <SignOut />
            </Menu.Item>
        </Menu>
    );
};

const _SignOut = ({unsetUser}) => {
    const signOutHandler = () => {
        fetch("/api/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(data => {
            unsetUser();
        });
    };

    return (
        <span className="ant-dropdown-link" onClick={() => signOutHandler()}>
            Sign Out
        </span>
    );
};
const SignOut = connect(null, { unsetUser })(_SignOut);

// export default connect(null, { unsetUser })(UserMenu);