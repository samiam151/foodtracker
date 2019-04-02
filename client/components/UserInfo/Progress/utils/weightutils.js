import React from "react";

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
		let weight= payload[0].value,
			targetWeight = payload[1].value;

		
		return (
			<div className="custom-tooltip">
				{
					payload.map(el => (
						<div key={el.name}>
							<b>{capitalize(dedash(el.name))}: </b>
							<span>{el.value} lbs.</span>
						</div>
					))
				}
				<div>
					<b>Difference: </b>
					<span>{weight - targetWeight} lbs.</span>
				</div>
			</div>
		);
	}

	return null;
}
