import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { setContent, showModal, hideModal } from "../Utilites/actions";

import AddFoodComponent from "./AddFoodComponent";
import { LoggedFoodComponent } from "./LoggedFood";
import { Button, Icon } from "antd";

import { setUpdateFoodEntry, removeFoodEntry } from "./actions";

const Meal = (props) => {
    const addFoodEntry = () => {
        props.setContent(AddFoodComponent);
        props.showModal("addFood");
        props.setUpdateFoodEntry("meal_name", props.name)
    }

    return (
        <div className="meal pill">
            <div className="meal__header">
                <h4 className="meal__header--title">{props.name}</h4>

                <div className="meal__header--button">
                    <Button type="primary" onClick={addFoodEntry}>
                        <Icon type="plus" /><span>Add to {props.name}</span>
                    </Button>
                </div>
            </div>
            
            <div className="loggedFoods">{ 
                props.loggedFoods ? 
                    props.loggedFoods.map((food, index) => <LoggedFoodComponent key={index} food={food} removeEntry={props.removeFoodEntry} />) : 
                    <p>{`No food logged for ${props.name}`}</p>
            }</div>
        </div>
    )
}

export default connect(null, { setContent, showModal, setUpdateFoodEntry, removeFoodEntry })(Meal);