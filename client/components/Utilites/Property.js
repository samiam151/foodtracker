import React from "react";

export const Property = ({label, value}) => (
    <div className="property">
        <strong className="property__label">{label}: </strong>
        <span className="property__value">{value}</span>
    </div>
)