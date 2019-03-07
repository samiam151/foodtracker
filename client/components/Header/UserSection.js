import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Menu, Dropdown, Icon } from "antd";

const UserMenu = () => {
    const signOut = () => {
        fetch("/api/logout")
        .then(data => console.log(data));
    }

    return (
        <Menu>
            <Menu.Item>
                <p className="ant-dropdown-link" onClick={() => signOut()}>
                    Sign Out
                </p>
            </Menu.Item>
        </Menu>
    );
};

const UserSection = ({user}) => (
    <div className="userSection">
        <Dropdown overlay={UserMenu}>
            <a className="ant-dropdown-link" href="#">
                <Icon type="user" />
                {/* <span>{user.name}</span> */}
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