import React, {useState, useContext} from "react";

import { WeightChart } from "./WeightChart";

export const ProgressComponent = (props) => {
    return (
        <div className="progressContainer">
            <div className="pill">
                <WeightChart user={props.user} />
            </div>
        </div>
    );
}