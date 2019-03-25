import React, {Fragment, useState, useEffect} from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Bar, BarChart,
    Brush
} from "recharts";
import { Loader } from "../../Utilites/Loader";
import ClientUserService from "../../../services/ClientUserService";



export const WorkoutsChart = ({data, ...props}) => {

    const formatXAxis = (t) => new Date(t).toLocaleDateString();
    
    return (
        <article>
            <h4>Workouts</h4>

            <ResponsiveContainer width="95%" height={250}>
                <LineChart data={data}>
                    <Line connectNulls type="monotone" dataKey="calories_burned" stroke="#1890ff" fill="#1890ff" />
                    <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                    <XAxis dataKey="date" interval="preserveStartEnd" tickFormatter={formatXAxis}/>
                    <YAxis domain={[0, "dataMax + 50"]} />
                    <Tooltip />
                    <Legend />

                    <Brush 
                        dataKey='calories_burned' 
                        height={40} 
                        stroke="#000000"
                        startIndex={data.length - 20}>

                        <LineChart>
                            <Line type="monotone" dataKey="calories_burned" />
                        </LineChart>

                    </Brush>
                </LineChart>
            </ResponsiveContainer>
        </article>
    );
}