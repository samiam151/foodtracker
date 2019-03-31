import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { capitalize, dedash, CustomTooltip } from "./utils/calorieutils";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  BarChart,
  AreaChart,
  Area,
  Legend
} from "recharts";

export const CaloriesChart = ({ data, ...props }) => {
  return (
    <div className="chart">
      <h3>Calorie Intake / Expenditure</h3>
      <p>
        The blue bar indicates the amount of calories consumed. The red bar
        indicates the amount of calories expended exercising.
      </p>
      <ResponsiveContainer width="90%" height={props.height}>
        <BarChart
          data={data}
          syncId="777"
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={1} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={1} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis
            dataKey="weight"
            domain={[0, 7500]}
            label={{
              value: "Calories (kcal)",
              angle: -90,
              position: "insideLeft"
            }}
          />
          <CartesianGrid strokeDasharray="2 2" />
          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="calories" fill="#8884d8" stackId="a" />
          <Bar dataKey="calories_burned" fill="#f44242" stackId="a" />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
