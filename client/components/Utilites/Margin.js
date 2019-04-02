import React from "react";

export const Margin = ({amount, unit, ...props}) => {
    const style = {
        margin: `${amount}${unit}`
    }
    return (
        <div style={style}>
            { props.children }
        </div>
    );
}