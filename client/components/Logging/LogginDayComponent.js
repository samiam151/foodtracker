import React, { Component } from "react";
import { render } from "react-dom";
import { Autocomplete } from "../Utilites/Autocomplete";
import ClientFoodService from "../../services/ClientFoodService";
import ClientFoodUserService from "../../services/ClientFoodUserService";
import { Layout } from "../Layout/Layout";
import { getTodaysLogs } from "./actions/initLogsAction";
import { connect } from "react-redux";
import { store } from "../../store";


class LogginDayComponent extends Component {
    componentDidMount() {
        let _d = new Date().toLocaleDateString().split("/");
        let today = `${_d[2]}-${_d[0].padStart(2, '0')}-${_d[1].padStart(2, '0')}`;

        ClientFoodUserService.getUsersMeals(17, "2019-02-23")
        .then(res => {
            let groupedByMeals = res.reduce((obj, foodEntry) => {
                if (!obj[foodEntry["meal_name"]]) {
                    obj[foodEntry["meal_name"]] = [];
                }
                obj[foodEntry["meal_name"]].push(foodEntry);
                return obj;
            }, {});

            store.dispatch({
                type: "GET_INIT_LOGS",
                payload: groupedByMeals
            });
        });
    }

    render() {
        let mealObj = this.props.logs;
        return (
            <Layout>
                <div className="logContainer">
                    {
                        Object.keys(mealObj).map((mealName, idx) => {
                            console.log(mealName);
                            return <Meal key={idx} name={mealName} loggedFoods={mealObj[mealName]} />
                        })
                    }
                </div>
            </Layout>
        );
    }
}

const Meal = (props) => (
    <div className="meal">
        <h4>{props.name}</h4>
        <AddFoodComponent />
        { 
            props.loggedFoods.map(food => <LoggedFood key={food.id} food={food} />)
        }
    </div>
);

const LoggedFood = ({food}) => {
    console.log(food);
    return <div className="loggedFood">
        {food.food_id} - {food.calories}
    </div>
};

class AddFoodComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            searchResults: []
        };
    }

    searchInputChange(e) {
        let value = e.target.value;
        if (value.length <= 3) {
            return;
        }

        ClientFoodService.searchFood(value)
        .then(results => {
            console.log(results);
            this.setState({
                searchResults: results
            });
        });
    }

    render() {
        return (
            <div className="addFood">
                <input type="text" name="foodInput" className="addFood__serachInput" onChange={(e) => this.searchInputChange(e)}/>
                <ul className="addFood__searchResults">
                    {
                        this.state.searchResults.map((food, index) => (
                            <li key={index} className="addFood__searchResult">{food.label}</li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

// REDUX
const mapStateToProps = store => ({logs: store.logging});
export default connect(mapStateToProps, { getTodaysLogs })(LogginDayComponent)