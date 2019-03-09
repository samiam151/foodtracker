import React, { Component, useEffect } from "react";
import { render } from "react-dom";
import { Layout } from "../Layout/Layout";
import { getTodaysLogs, fetchLogs } from "./actions";
import { connect } from "react-redux";
import { Loader } from "../Utilites/Loader";
import Meal from "./MealComponent";
import { LoggingProgress } from "./LoggingProgress";
import { MEAL_NAMES } from "../../models/meals";
import { Redirect } from "react-router-dom";

const MealContainer = ({meals}) => {
    return <div>
        {
            MEAL_NAMES.map((meal, idx) => (
                <Meal key={idx} name={meal} loggedFoods={meals[meal]} />
            ))
        }
    </div>
}

const LogginDayComponent = ({logs, user, fetchLogs}) => {

    useEffect(() => {
        let _d = new Date().toLocaleDateString().split("/");
        let today = `${_d[2]}-${_d[0].padStart(2, '0')}-${_d[1].padStart(2, '0')}`;

        fetchLogs(user.id);
    }, []);

    const splitMeals = (meals = []) => {
        return meals.reduce((obj, foodEntry) => {
            if (!obj[foodEntry["meal_name"]]) {
                obj[foodEntry["meal_name"]] = [];
            }
            obj[foodEntry["meal_name"]].push(foodEntry);
            return obj;
        }, {});
    }

    return (
        !user.isAuthenticated ? <Redirect to={{
            pathname: "/login",
            state: { from: "/login" }
        }}/> :
        <Layout>
            <div className="logProgress__container">
                {                        
                    <LoggingProgress meals={logs || []} />
                }
            </div>
            <div className="logContainer">
                {
                    <MealContainer meals={splitMeals(logs)} />
                }
            </div>
        </Layout>
    )
}

// class LogginDayComponent extends Component {
//     componentDidMount() {
//         // Get today's date
//         let _d = new Date().toLocaleDateString().split("/");
//         let today = `${_d[2]}-${_d[0].padStart(2, '0')}-${_d[1].padStart(2, '0')}`;

//         this.props.fetchLogs(this.props.user.id);
//     }

    

//     render() {
//         function splitMeals(meals = []) {
//             return meals.reduce((obj, foodEntry) => {
//                 if (!obj[foodEntry["meal_name"]]) {
//                     obj[foodEntry["meal_name"]] = [];
//                 }
//                 obj[foodEntry["meal_name"]].push(foodEntry);
//                 return obj;
//             }, {});
//         }

//         return (
//             <Layout>
//                 <div className="logProgress__container">
//                     {                        
//                         <LoggingProgress meals={this.props.logs || []} />
//                     }
//                 </div>
//                 <div className="logContainer">
//                     {
//                         <MealContainer meals={splitMeals(this.props.logs)} />
//                     }
//                 </div>
//             </Layout>
//         );
//     }
// }



// REDUX
const mapStateToProps = store => ({
    logs: store.logging.meals,
    user: store.user
});
export default connect(mapStateToProps, { getTodaysLogs, fetchLogs })(LogginDayComponent)