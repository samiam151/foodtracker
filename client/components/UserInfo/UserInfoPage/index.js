import React, {Fragment, useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout } from "../../Layout/Layout";

import { AddEditGoalsComponent } from "../AddEditGoals";
import { ProgressComponent } from "../Progress";

const UserInfoPageFunction = ({user, match, ...props}) => {
    
    return (
        <Layout>
            <div>
                <ul>
                    <li>
                        <Link to={match.url}>User</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/progress`}>Progress</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/goals`}>Goals</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/account`}>Account</Link>
                    </li>
                </ul>
            
                <Route path={`${match.path}/goals`} component={AddEditGoalsComponent} />
                <Route path={`${match.path}/account`} render={() => <h3>Account Page</h3>} />
                <Route path={`${match.path}/progress`} render={() => {
                    return (
                        <>
                            <h3>Progress Page</h3>
                            <ProgressComponent user={user} />
                        </>
                    )
                }} />
                <Route exact path={match.path} render={() => <h3>User Page</h3>} />
            </div>
        </Layout>
      );
}

export const UserInfoPageComponent = connect((store) => ({
    user: store.user
}))(UserInfoPageFunction);