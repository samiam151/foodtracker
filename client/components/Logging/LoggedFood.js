import React, { Component } from "react";
import { render } from "react-dom";

import ClientFoodUserService from "../../services/ClientFoodUserService";
import { Icon, Popconfirm, message } from "antd";

export const LoggedFoodComponent = ({food, removeEntry}) => {
    const removeFoodEntry = () => {
        ClientFoodUserService.removeFoodEntry(food.id)
            .then(data => {
                removeEntry(food.id);
                message.success(`${food.food_name} deleted.`);
            })
    }

    return (
        <div className="loggedFood" data-id={food.id}>
            <div className="loggedFood--name">
                {food.food_name}
            </div>
            <div className="loggedFood--quantity">
                {food.quantity} {food.measure}
            </div>
            <div className="loggedFood--calories">
                {food.calories} kcal
            </div>
            <div className="loggedFood--remove">
                <Popconfirm title="Are you sure delete this entry?" 
                    overlayClassName="loggedFood--removeConfirm"
                    onConfirm={removeFoodEntry} 
                    placement="left"
                    okText="Yes" 
                    cancelText="No">
                    <Icon type="close-circle" />
                </Popconfirm>
            </div>
        </div>
    )
};