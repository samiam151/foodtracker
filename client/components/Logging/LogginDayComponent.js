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
import { LoggingProgress } from "./LoggingProgress";
import { MEAL_NAMES } from "../../models/meals";

const MealContainer = ({meals}) => {
    return <div>{
            MEAL_NAMES.map((meal, idx) => (
                <Meal key={idx} name={meal} loggedFoods={meals[meal]} />
            ))
        }
    </div>
}

class LogginDayComponent extends Component {
    componentDidMount() {
        console.log("user", this.props.user)
        if (this.props.user.isAuthenticated) {
            // Get today's date
            let _d = new Date().toLocaleDateString().split("/");
            let today = `${_d[2]}-${_d[0].padStart(2, '0')}-${_d[1].padStart(2, '0')}`;

            ClientFoodUserService.getUsersMeals(this.props.user.id)
            .then(meals => {
                // Response is object of food entries, grouped by meal name
                store.dispatch({
                    type: "GET_INIT_LOGS",
                    payload: meals
                });
            });
        } else {
            window.location.pathname = "/login";
        }

    }

    render() {
        let mealObj = this.props.logs.meals;
        // let allEntries = Object.keys(this.props.logs.meals).reduce((arr, mealName) => {
        //     let entries = mealObj[mealName];
        //     arr.concat(entries);
        //     return arr;
        // }, []);
        return (
            <Layout>
                <div className="logProgress__container">
                    {
                        mealObj === undefined ? <Loader /> : 
                        
                        <LoggingProgress meals={mealObj} />
                    }
                </div>
                <div className="logContainer">
                    {
                        
                        mealObj === undefined ? <Loader /> : 
                        <MealContainer meals={mealObj} />
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