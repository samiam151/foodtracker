import React from "react";
import { Property } from "../Utilites/Property";

export const LoggingProgress = ({meals}) => {
    let allEntries = Object.keys(meals).reduce((arr, mealName) => {
        let entries = meals[mealName];
        return arr.concat(entries);
    }, []);
    
    const numCalories = allEntries.reduce((sum, b) => {
        return sum + b.calories;
    }, 0);

    return (
        <div className="loggingProgress pill">
            <Property label="Total Calories" value={numCalories + " kcal"} />
        </div>
    )
}