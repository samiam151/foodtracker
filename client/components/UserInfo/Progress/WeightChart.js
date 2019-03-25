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
    Brush
} from "recharts";
import { Loader } from "../../Utilites/Loader";
import ClientUserService from "../../../services/ClientUserService";



export const WeightChart = ({data, ...props}) => {

    const formatXAxis = (t) => new Date(t).toLocaleDateString();
    
    return (
        <article>
            <h4>Weights</h4>
            <ResponsiveContainer width="95%" height={250}>
                <LineChart data={data}>
                    <Line connectNulls type="monotone" dataKey="weight" stroke="#1890ff" fill="#1890ff" />
                    <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                    <XAxis dataKey="date" interval="preserveStartEnd" tickFormatter={formatXAxis}/>
                    <YAxis domain={[50, "dataMax + 50"]} />
                    <Tooltip />
                    <Legend />

                    <Brush 
                        dataKey='weight' 
                        height={40} 
                        stroke="#000000"
                        startIndex={data.length - 20}>

                        <LineChart>
                            <Line type="monotone" dataKey="weight" />
                        </LineChart>

                    </Brush>
                </LineChart>
            </ResponsiveContainer>
        </article>
    );
}