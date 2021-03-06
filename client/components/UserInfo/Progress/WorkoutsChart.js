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



export const WorkoutsChart = ({data, ...props}) => {

    const formatXAxis = (t) => new Date(t).toLocaleDateString();
    
    return (
        <article>
            <h4>Workouts</h4>

            <ResponsiveContainer width="95%" height={props.height}>
                <BarChart data={data} syncId="777">
                    <Bar dataKey="calories_burned" stroke="#1890ff" fill="#1890ff" />
                    <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                    <XAxis dataKey="date" interval="preserveStartEnd" tickFormatter={formatXAxis}/>
                    <YAxis domain={[0, "dataMax + 50"]} />
                    <Tooltip />
                    <Legend />

                    <Brush 
                        dataKey='calories_burned' 
                        height={30} 
                        stroke="#000000"
                        startIndex={data.length - 20}>

                        <BarChart>
                            <Bar legendType="circle" dataKey="calories_burned" stroke="#1890ff" fill="#1890ff" />
                        </BarChart>

                    </Brush>
                </BarChart>
            </ResponsiveContainer>
        </article>
    );
}