import React, {Fragment, useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout } from "../../Layout/Layout";

import { AddEditGoalsComponent } from "../AddEditGoals";
import { ProgressComponent } from "../Progress";
import { NavLink } from "react-router-dom";

const UserInfoPageFunction = ({user, match, ...props}) => {
    
    return (
        <Layout>
            <div className="userInfoPage__container">
                <ul className="userInfo__nav">
                    <li>
                        <NavLink exact activeClassName="active" to={`${match.url}`}>Progress</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to={`${match.url}/goals`}>Goals</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to={`${match.url}/account`}>Account</NavLink>
                    </li>
                </ul>
            
                <Route path={`${match.path}/goals`} component={AddEditGoalsComponent} />
                <Route path={`${match.path}/account`} render={() => <h3>Account Page</h3>} />
                <Route exact path={`${match.path}`} render={() => {
                    return (
                        <>
                            <h3>Progress Page</h3>
                            <ProgressComponent user={user} />
                        </>
                    )
                }} />
                {/* <Route exact path={match.path} render={() => <h3>User Page</h3>} /> */}
            </div>
        </Layout>
      );
}

export const UserInfoPageComponent = connect((store) => ({
    user: store.user
}))(UserInfoPageFunction);