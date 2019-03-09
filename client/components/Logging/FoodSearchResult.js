import React from "react";
import { Col, Row } from "antd";

export const FoodSearchResult = (props) => (
    <li className="addFood__searchResult" onClick={(r) => props.onClickCB(props)}>
        <Row type="flex" justify="space-between">
            <Col xs={12} md={18}>
                <span className="searchResult--label">
                    {props.label}
                </span>
            </Col>
            
            <Col xs={12} md={6}>
                <span className="searchResult--calories">
                    {props.calories.toFixed(1)} Kcal
                </span>
            </Col>
        </Row>
    </li>
);