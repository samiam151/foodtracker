import React from "react";
import { Property } from "../Utilites/Property";
import { AddButtonsComponent } from "./AddButtons";

export const LoggingProgress = ({meals}) => {
    const numCalories = meals.reduce((sum, b) => {
        return sum + Number.parseFloat(b.calories);
    }, 0);

    return (
        <div className="loggingProgress pill">
            <div className="logginProgress__left">
                <Property label="Total Calories" value={numCalories + " kcal"} />
            </div>

            <div className="logginProgress__right">
                <div className="loggingProgress__addButtons">
                    <AddButtonsComponent />
                </div>
            </div>
        </div>
    )
}