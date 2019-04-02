import React from "react";
import { Icon } from "antd";

export function capitalize(string) {
  return string
    .split(" ")
    .map(s => {
      return s.charAt(0).toUpperCase() + s.slice(1);
    })
    .join(" ");
}
export function dedash(string) {
  return string.replace("_", " ");
}

export function CustomTooltip({ active, payload, label }) {
  if (active && payload.length === 2) {
    
    let calories = payload[0].value,
      burned = payload[1].value;
    return (
      <div className="custom-tooltip">
        {
          payload.map(el => (
            <div key={el.name}>
              <b>{capitalize(dedash(el.name))}: </b>
              <span>{el.value} kcal</span>
            </div>
          ))
        }
        <div>
          <b>Total Calories: </b>
          <span>{calories - burned} kcal</span>
        </div>
      </div>
    );
  }

  return null;
}
