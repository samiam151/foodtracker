import React, {useState, useEffect} from "react";

import { WeightChart } from "./WeightChart";
import { CaloriesChart } from "./CaloriesChart";
import { WorkoutsChart } from "./WorkoutsChart";
import ClientUserService from "../../../services/ClientUserService";

export const ProgressComponent = (props) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        ClientUserService.getChartData(props.user.id)
            .then(res => {
                setChartData(res);
            })
    }, [])

    return (
        <div className="progressContainer">
            <div className="pill">
                <WeightChart user={props.user} data={chartData} />
            </div>
            <br />
            <div className="pill">
                <CaloriesChart user={props.user} data={chartData} />
            </div>
            <br />
            <div className="pill">
                <WorkoutsChart user={props.user} data={chartData} />
            </div>
        </div>
    );
}