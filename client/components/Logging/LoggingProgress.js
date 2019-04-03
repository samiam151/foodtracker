import React from "react";
import { Property } from "../Utilites/Property";
import { AddButtonsComponent } from "./AddButtons";
import { DayProgressChart } from "./DayProgressChart";

import { Row, Col } from "antd";
import { Padding } from "../Utilites/Padding";

export const LoggingProgress = ({meals, ...props}) => {
    const numCalories = meals.reduce((sum, b) => {
        return sum + Number.parseFloat(b.calories);
    }, 0);

    const workoutCalories = props.user

    return (
        <div className="loggingProgress pill">
            <Row type="flex">
                <Col xs={24} md={16}>
                    <div className="logginProgress__left">
                        <Property label="Daily Caloric Budget" value={props.user.bmr + " kcal"} />
                        <Property label="Total Calories" value={numCalories + " kcal"} />

                        <Padding xAmount={1} unit="em">
                            <DayProgressChart calories={numCalories} bmr={props.user.bmr}/>
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