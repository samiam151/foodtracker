import React from "react";

export const Padding = (props) => {
    const style = {
        paddingTop: `${props.xAmount || 0}${props.unit}`,
        paddingLeft: `${props.yAmount || 0}${props.unit}`,
        paddingBottom: `${props.xAmount || 0}${props.unit}`,
        paddingRight: `${props.yAmount || 0}${props.unit}`,
    }
    return (
        <div style={style}>
            { props.children }
        </div>
    );
}