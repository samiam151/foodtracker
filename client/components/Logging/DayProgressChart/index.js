import React from "react";
import { 
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

export const DayProgressChart = ({calories, bmr, ...props}) => {
    const data = [{
        calories: calories,
        bmr: (bmr - calories)
    }]

    return (
        <ResponsiveContainer width="100%" height={50}>
            <BarChart layout="vertical" data={data} margin={{top: 0, left: -55, right: 0, bottom: 0}}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis type="number" domain={[0, bmr]}></XAxis>
                <YAxis type="category"></YAxis>
                <Bar dataKey="calories" fill="#88e828" stackId="a"></Bar>
                <Bar dataKey="bmr" fill="#ee7e7a" stackId="a"></Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};