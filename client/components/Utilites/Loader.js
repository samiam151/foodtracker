import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 60 }} spin />;

export const Loader = () => (
    <div className="loaderContainer">
        <Spin indicator={antIcon} size="small" className="loader" />
    </div>
);