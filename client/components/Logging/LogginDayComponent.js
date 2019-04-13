import React, { Component, useEffect } from "react";
import { render } from "react-dom";
import { Layout } from "../Layout/Layout";
import { getTodaysLogs, fetchLogs, setActiveDate } from "./actions";
import { connect } from "react-redux";
import { Loader } from "../Utilites/Loader";
import Meal from "./MealComponent";
import { LoggingProgress } from "./LoggingProgress";
import { MEAL_NAMES } from "../../models/meals";
import { Redirect } from "react-router-dom";
import { splitMeals } from "../../utils";
import { Padding } from "../Utilites/Padding";
import moment from "moment";
import { Row, Col } from "antd";
import { DateSetter } from "./DateSetter";

const MealContainer = ({meals}) => (
    <div>
        {
            MEAL_NAMES.map((meal, idx) => (
                <Meal key={idx} name={meal} loggedFoods={meals[meal] || []} />
            ))
        }
    </div>
);

const LogginDayComponent = ({active_date, logs, user, workouts, fetchLogs, ...props}) => {
    
    useEffect(() => {
        fetchLogs(user.id, active_date);
    }, [active_date, workouts]);

    return (
        !user.isAuthenticated ? <Redirect to={{
            pathname: "/login",
            state: { from: "/login" }
        }}/> :
        <Layout>
            <div className="logProgress__settings  pill">
                <Row type="flex" align="middle">
                    <Col xs={12}> 
                        <strong>Welcome the the logging page!</strong>
                        <p>Here, you can add food entries, weight entries, and workout entries. All entries will be applied on the date to the right!</p>
                    </Col>
                    <Col xs={12} className="logProgress__date">
                        <strong>Active Date: </strong>
                        <DateSetter setDate={props.setActiveDate} />
                    </Col>
                </Row>
            </div>
            <div className="logProgress__container">
                {                        
                    <LoggingProgress meals={logs || []} user={user} workouts={workouts} date={active_date} />
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
    active_date: store.logging.date,
    logs: store.logging.meals,
    user: store.user,
    workouts: store.workouts
});
export default connect(mapStateToProps, { getTodaysLogs, fetchLogs, setActiveDate })(LogginDayComponent)