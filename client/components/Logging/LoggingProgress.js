import React from "react";
import { Property } from "../Utilites/Property";

export const LoggingProgress = ({meals}) => {
    const numCalories = meals.reduce((sum, b) => {
        return sum + Number.parseFloat(b.calories);
    }, 0);

    return (
        <div className="loggingProgress pill">
            <Property label="Total Calories" value={numCalories + " kcal"} />
        </div>
    )
}