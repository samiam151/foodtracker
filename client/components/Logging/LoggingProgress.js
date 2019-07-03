import React from "react";
import { Property } from "../Utilites/Property";
import { AddButtonsComponent } from "./AddButtons";
import { DayProgressChart } from "./DayProgressChart";

import { Row, Col } from "antd";
import { Padding } from "../Utilites/Padding";
import moment from "moment";

export const LoggingProgress = ({meals, workouts, ...props}) => {
    const numCalories = meals.reduce((sum, b) => {
        return sum + Number.parseFloat(b.calories);
    }, 0);
    
    const todaysWorkouts = workouts.filter(row => moment(row.entry_date).format("YYYY-MM-DD") === props.date);
    let all_calories_burned = 0;

    if (todaysWorkouts.length) {
        all_calories_burned = todaysWorkouts.reduce((sum, next) => {
            return sum += Number(next.calories_burned);
        }, 0)
    }

    const totalCalories = numCalories - all_calories_burned;

    function toCalories(num) { return num + " kcal" }

    return (
        <div className="loggingProgress pill">
            <Row type="flex">
                <Col xs={24} md={16}>
                    <div className="logginProgress__left">
                        <Row type="flex">
                            <Col xs={24} md={12}>
                                <Property label="Daily Caloric Budget" value={toCalories(props.user.bmr)} />
                                <Property label="Calories Consumed" value={toCalories(numCalories)} />
                            </Col>
                            <Col xs={24} md={12}>
                                <Property label="Calories Burned" value={toCalories(all_calories_burned)} />
                                <Property label="Total Calories" value={toCalories(totalCalories)} />
                            </Col>
                        </Row>

                        <Padding xAmount={1} unit="em">
                            <DayProgressChart calories={totalCalories} bmr={props.user.bmr}/>
                        </Padding>
                    </div>
                </Col>
                <Col xs={24} md={8}>
                    <div className="logginProgress__right">
                        <div className="loggingProgress__addButtons">
                            <AddButtonsComponent />
                        </div>
                    </div>
                </Col> 
            </Row>

        </div>
    )
}