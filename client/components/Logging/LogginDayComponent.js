import React, { Component, useEffect } from "react";
import { render } from "react-dom";
import { Layout } from "../Layout/Layout";
import { getTodaysLogs, fetchLogs } from "./actions";
import { connect } from "react-redux";
import { Loader } from "../Utilites/Loader";
import Meal from "./MealComponent";
import { LoggingProgress } from "./LoggingProgress";
import { MEAL_NAMES } from "../../models/meals";
import { Redirect } from "react-router-dom";
import { splitMeals } from "../../utils";

const MealContainer = ({meals}) => (
    <div>
        {
            MEAL_NAMES.map((meal, idx) => (
                <Meal key={idx} name={meal} loggedFoods={meals[meal]} />
            ))
        }
    </div>
);

const LogginDayComponent = ({logs, user, fetchLogs}) => {
    
    useEffect(() => {
        fetchLogs(user.id);
    }, []);

    return (
        !user.isAuthenticated ? <Redirect to={{
            pathname: "/login",
            state: { from: "/login" }
        }}/> :
        <Layout>
            <div className="logProgress__container">
                {                        
                    <LoggingProgress meals={logs || []} />
                }
            </div>
            <div className="logContainer">
                {
                    <MealContainer meals={splitMeals(logs)} />
                }
            </div>
        </Layout>
    )
}

// REDUX
const mapStateToProps = store => ({
    logs: store.logging.meals,
    user: store.user
});
export default connect(mapStateToProps, { getTodaysLogs, fetchLogs })(LogginDayComponent)