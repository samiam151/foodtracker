import React from "react";

export const BackroundImage = ({src, ...props}) => {
    const styles = {
        backgroundImage: `url(${src})`,
        backgroundSize: "cover"
    }
    return (
        <div style={styles} className={`backgroungComponent ${props.cssClass}`}>
            { props.children }
        </div>
    );
}