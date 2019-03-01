import React, { Component } from "react";
import { render } from "react-dom";
import { Autocomplete } from "../Utilites/Autocomplete";
import ClientFoodService from "../../services/ClientFoodService";
import ClientFoodUserService from "../../services/ClientFoodUserService";
import { Layout } from "../Layout/Layout";
import { getTodaysLogs } from "./actions";
import { connect } from "react-redux";
import { store } from "../../store";
import { SearchFoodComponent } from "./SearchFoodComponent";
import { Loader } from "../Utilites/Loader";
import Meal from "./MealComponent";

class LogginDayComponent extends Component {
    componentDidMount() {
        console.log(Object.entries(this.props.logs).length);
        if (Object.entries(this.props.logs).length === 0) {
            // Get today's date
            let _d = new Date().toLocaleDateString().split("/");
            let today = `${_d[2]}-${_d[0].padStart(2, '0')}-${_d[1].padStart(2, '0')}`;

            ClientFoodUserService.getUsersMeals(this.props.user.id, "2019-02-23")
            .then(meals => {
                // Response is object of food entries, grouped by meal name
                store.dispatch({
                    type: "GET_INIT_LOGS",
                    payload: meals
                });
            });
        }

    }

    render() {
        let mealObj = this.props.logs.init_meals;
        console.log(mealObj);
        return (
            <Layout>
                <div className="logContainer">
                    {
                        mealObj === undefined ? <Loader /> : Object.keys(mealObj).map((mealName, idx) => {
                            console.log(mealName);
                            return <Meal key={idx} name={mealName} loggedFoods={mealObj[mealName]} />
                        })
                    }
                </div>
            </Layout>
        );
    }
}

// REDUX
const mapStateToProps = store => ({
    logs: store.logging,
    user: store.user
});
export default connect(mapStateToProps, { getTodaysLogs })(LogginDayComponent)