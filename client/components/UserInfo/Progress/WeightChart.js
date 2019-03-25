import React, {useState, useEffect} from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import ClientUserService from "../../../services/ClientUserService";



export const WeightChart = (props) => {
    const [weightData, setWeightData] = useState([]);
    useEffect(() => {
        ClientUserService.getWeightData(props.user.id)
            .then(res => {
                setWeightData(res);
            })
    }, [])

    const formatXAxis = (t) => new Date(t).toLocaleDateString();

    return (
        <ResponsiveContainer width="95%" height={200}>
            <LineChart data={weightData}>
                <Line connectNulls type="monotone" dataKey="weight" stroke="#8884d8" fill="#8884d8" />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="date" interval="preserveStartEnd" tickFormatter={formatXAxis}/>
                <YAxis domain={["dataMin - 50", "dataMax + 50"]} />
                <Tooltip />
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    );
}