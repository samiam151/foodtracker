import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CustomTooltip } from "./utils/weightutils";
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
  AreaChart,
  Area,
  Legend
} from "recharts";

export const WeightChart = ({ data, ...props }) => {
  return (
    <div className="chart">
      <h3>Weight Data</h3>

      <ResponsiveContainer width="95%" height={props.height}>
        <ComposedChart
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
            domain={["dataMin - 25", "dataMax + 25"]}
            label={{
              value: "Pounds (lbs)",
              angle: -90,
              position: "insideLeft"
            }}
          />
          <CartesianGrid strokeDasharray="2 2" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
          <Line
            type="monotone"
            dataKey="target_weight"
            stroke="#ff0000"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
          <Legend />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
