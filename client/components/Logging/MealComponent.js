import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { setContent, showModal, hideModal } from "../Utilites/actions";

import AddFoodComponent from "./AddFoodComponent";
import { Button, Icon } from "antd";

import { setUpdateFoodEntry } from "./actions";

class Meal extends Component {
    constructor(props) {
        super(props);
        this.addFoodEntry = this.addFoodEntry.bind(this);
    }

    addFoodEntry() {
        console.log(AddFoodComponent);
        this.props.setContent(AddFoodComponent);
        this.props.showModal("addFood");
        this.props.setUpdateFoodEntry("meal_name", this.props.name)
    }

    render() {
        return (
            <div className="meal pill">
                <div className="meal__header">
                    <h4 className="meal__header--title">{this.props.name}</h4>

                    <div className="meal__header--button">
                        <Button type="primary" onClick={this.addFoodEntry}>
                            <Icon type="plus" /><span>Add to {this.props.name}</span>
                        </Button>
                    </div>
                </div>
                
                <div className="loggedFoods">{ 
                    this.props.loggedFoods ? 
                        this.props.loggedFoods.map((food, index) => <LoggedFood key={index} food={food} />) : 
                        <p>{`No food logged for ${this.props.name}`}</p>
                }</div>
            </div>
        )
    }
}


const LoggedFood = ({food}) => {
    console.log(food);
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
        </div>
    )
};

export default connect(null, { setContent, showModal, setUpdateFoodEntry })(Meal);