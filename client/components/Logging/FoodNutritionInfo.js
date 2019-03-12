import React, { Component, Fragment } from "react";
import { render } from "react-dom";

export const FoodNutritionInfo = ({info, quantity}) => {
    function displayMacro(macro) {
        if (info.hasOwnProperty(macro)) {
            let _macro = info[macro];
            let calculation = Number.prototype.toFixed.call((_macro.quantity * quantity), 1);

            const _info = 
                <div className="nutrition--macro">
                    <strong>{_macro.label}: </strong>
                    <span>{calculation}{_macro.unit}</span>
                </div>;
            return _info;
        }
        return null;
    }

    return (
        <div className="nutrition--infoContainer">
            { displayMacro("calories") }
            { displayMacro("carbs") }
            { displayMacro("protein") }
            { displayMacro("fat") }
        </div>
    );
}