import React from "react";
import { Property } from "../Utilites/Property";
import { AddButtonsComponent } from "./AddButtons";
import { DayProgressChart } from "./DayProgressChart";

import { Row, Col } from "antd";
import { Padding } from "../Utilites/Padding";

export const LoggingProgress = ({meals, workouts, ...props}) => {
    const numCalories = meals.reduce((sum, b) => {
        return sum + Number.parseFloat(b.calories);
    }, 0);
    
    const todaysWorkout = workouts.find(row => new Date(row.entry_date).getDate() === new Date().getDate());
    const totalCalories = numCalories - (todaysWorkout ? todaysWorkout.calories_burned : 0);

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
                                <Property label="Calories Burned" value={toCalories(todaysWorkout ? todaysWorkout.calories_burned : 0)} />
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