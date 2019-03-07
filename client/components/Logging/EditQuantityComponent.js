import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { Loader } from "../Utilites/Loader";
import ClientFoodService from "../../services/ClientFoodService";
import { setUpdateFoodEntry, setFoodEntry } from "./actions";

import { Input, Select } from "antd";
import { isNullOrUndefined } from "util";
const Option = Select.Option;

const FoodNutritionInfo = ({info, quantity}) => {
    function displayMacro(macro) {
        if (info.hasOwnProperty(macro)) {
            let _macro = info[macro];
            let calculation = Number.prototype.toFixed.call((_macro.quantity * quantity), 1);

            const _info = 
                <div className="nutrition--macro">
                    <strong>{_macro.label}: </strong>
                    <span>{calculation}{_macro.unit}</span>
                </div>;
            return _info;
        }
        return null;
    }

    return <div className="nutrition--infoContainer">
        { displayMacro("calories") }
        { displayMacro("carbs") }
        { displayMacro("protein") }
        { displayMacro("fat") }
    </div>
}

class _EditQuantityComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            measure: this.props.searchItem.measures[0],
            activeNutrientInfo: null,
            quantity: 1,
            quantity_fraction: 0
        };
    }

    componentDidMount() {
        // food_id, measure_uri
        this.getSetNutrients(this.props.searchItem.id, this.state.measure.uri);
        this.initializeStoreValues();
    }

    handleMeasureChange(e) {
        let newMeasure = e.target.value;
        let newMeasureUri = this.props.searchItem.measures.find(m => m.label === newMeasure).uri;

        this.getSetNutrients(this.props.searchItem.id, newMeasure);
        this.props.setUpdateFoodEntry("measure", newMeasure);
    }

    initializeStoreValues() {
        this.props.setUpdateFoodEntry("measure", this.props.searchItem.measures[0].label)
        this.props.setUpdateFoodEntry("quantity", 1);
        this.props.setUpdateFoodEntry("quantity_fraction", 0);
        this.props.setUpdateFoodEntry("food_id", this.props.searchItem.id);
        this.props.setUpdateFoodEntry("food_name", this.props.searchItem.label);
    }

    getSetNutrients(food_id, measure_uri) {
        ClientFoodService.getSearchFoodNutrients(food_id, measure_uri)
        .then(res => {
            console.log(res);
            this.setState(Object.assign({}, this.state, {
                activeNutrientInfo: res
            }));

            this.props.setFoodEntry(res);
            
        })
    }

    handleChange(e, _value = null) {
        let target = e.target,
            value = _value || target.value;

        let newState = Object.assign({}, this.state);
        newState[target.name] = target.name === "measures" ? target.dataset.uri : value;

        this.setState(newState);

        this.props.setUpdateFoodEntry(target.name, value);
        // let newCalories = +this.state.activeNutrientInfo.nutrients.calories.quantity * (+this.state.quantity + +this.state.quantity_fraction);
        // debugger;
        // this.props.setUpdateFoodEntry("calories", newCalories);
    }

    render() {
        return (
            !this.state.activeNutrientInfo ? <Loader /> : 

            <div className="addFood__editQuantity">
                <h3>{ this.props.searchItem.label }</h3>

                <div className="addFood__editQuantity--quantity">
                    <label htmlFor="quantity-whole">Quantity</label>
                    <input type="number"
                        name="quantity" 
                        id="quantity-whole" 
                        defaultValue="1" 
                        min={0}
                        onChange={(e) => this.handleChange(e, Number.parseInt(e.target.value))} />

                    <select name="quantity_fraction" id="quantity-fraction" onChange={(e) => this.handleChange(e, +e.target.value)}>
                        <option value={0}></option>
                        <option value={0.125}>1/8</option>
                        <option value={0.25}>1/4</option>
                        <option value={0.375}>3/8</option>
                        <option value={0.5}>1/2</option>
                        <option value={0.625}>5/8</option>
                        <option value={0.75}>3/4</option>
                        <option value={0.875}>7/8</option>
                    </select>
                </div>

                <div className="addFood__editQuantity--measurement">
                    <label htmlFor="measures">Measurement</label>
                    <select name="measures" id="measures" onChange={(e) => this.handleMeasureChange(e)}>
                        {
                            this.props.searchItem.measures.map(measure => (
                                <option key={measure.label} value={measure.label} data-uri={measure.uri}>{measure.label}</option>
                            ))
                        }
                    </select>
                </div>
                
                <div className="addFood__editQuantity--information">
                    {
                        this.state.activeNutrientInfo ? <FoodNutritionInfo quantity={+this.state.quantity + (+this.state.quantity_fraction)} info={this.state.activeNutrientInfo.nutrients} /> : <noscript />
                    }
                </div>
            </div>
        );
    }
}

export const EditQuantityComponent = connect((store) => ({
    searchItem: store.logging.search_food,
    workingFoodEntry: store.logging.working_food_entry
}), { setUpdateFoodEntry, setFoodEntry })(_EditQuantityComponent);