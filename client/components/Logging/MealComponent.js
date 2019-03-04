import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { setContent, showModal, hideModal } from "../Utilites/actions";

import AddFoodComponent from "./AddFoodComponent";
import { Button, Icon } from "antd";

class Meal extends Component {
    constructor(props) {
        super(props);
        this.addFoodEntry = this.addFoodEntry.bind(this);
    }

    addFoodEntry() {
        console.log(AddFoodComponent);
        this.props.setContent(AddFoodComponent);
        this.props.showModal("addFood");
    }

    render() {
        return (
            <div className="meal">
                <h4>{this.props.name}</h4>
        
                <Button type="primary" onClick={this.addFoodEntry}>
                    <Icon type="plus" /> Add to {this.props.name}
                </Button>
                
                <div className="loggedFoods">{ 
                    this.props.loggedFoods.map((food, index) => <LoggedFood key={index} food={food} />)
                }</div>
            </div>
        )
    }
}


const LoggedFood = ({food}) => {
    return <div className="loggedFood">
        {food.food_id} - {food.calories}
    </div>
};

export default connect(null, { setContent, showModal })(Meal);