import React, {useState, useEffect} from "react";

import { WeightChart } from "./WeightChart";
import { CaloriesChart } from "./CaloriesChart";
import { WorkoutsChart } from "./WorkoutsChart";
import ClientUserService from "../../../services/ClientUserService";

export const ProgressComponent = (props) => {
    const [chartData, setChartData] = useState([]);
    const chartHeight = 300;

    useEffect(() => {
        ClientUserService.getChartData(props.user.id)
            .then(data => data.map(d => {
                d.date = d.date.split("T")[0];
                return d;
            }))
            .then(res => {
                console.log(res);
                setChartData(res);
            })
    }, [])

    return (
        <div className="progressContainer">
            <div className="pill">
                <WeightChart user={props.user} data={chartData} height={chartHeight} />
            </div>
            <br />
            <div className="pill">
                <CaloriesChart user={props.user} data={chartData} height={chartHeight} />
            </div>
            <br />
            {/* <div className="pill">
                <WorkoutsChart user={props.user} data={chartData} height={chartHeight} />
            </div> */}
        </div>
    );
}