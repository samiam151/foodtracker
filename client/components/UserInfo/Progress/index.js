import React, {useState, useEffect} from "react";

import { WeightChart } from "./WeightChart";
import { CaloriesChart } from "./CaloriesChart";
import { WorkoutsChart } from "./WorkoutsChart";
import { Alert } from "antd";
import ClientUserService from "../../../services/ClientUserService";
import { Loader } from "../../Utilites/Loader";

export const ProgressComponent = (props) => {
    const [chartData, setChartData] = useState([]);
    const [chartDataRequested, setChartDataRequested] = useState(false);
    const chartHeight = 250;

    useEffect(() => {
        ClientUserService.getChartData(props.user.id)
            .then(data => data.map(d => {
                d.date = d.date.split("T")[0];
                return d;
            }))
            .then(res => {
                setChartDataRequested(true);
                setChartData(res);
            })
    }, [])

    return (
        chartDataRequested === false ? <Loader /> :
            chartData.length === 0 ? <p>Not enough data to graph yet. Keep tracking!</p> : 
                <div className="progressContainer">
                    <div className="pill">
                        <WeightChart user={props.user} data={chartData} height={chartHeight} />
                    </div>
                    <br />
                    <div className="pill">
                        <CaloriesChart user={props.user} data={chartData} height={chartHeight} />
                    </div>
                </div>
    );
}