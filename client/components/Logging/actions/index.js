import ClientFoodUserService from "../../../services/ClientFoodUserService";
import { 
    GET_INIT_LOGS, 
    SET_FOOD_SEARCH_ITEM, 
    SET_FOOD_ENTRY_DATA, 
    SET_FOOD_ENTRY,
    CLEAR_FOOD_ENTRY_DATA,
    ADD_TO_MEALS,
    REMOVE_FROM_MEALS
} from "./types";

export function getTodaysLogs(id) {
    return function(dispatch) {
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
            }, {})

            dispatch({
                type: GET_INIT_LOGS,
                payload: groupedByMeals
            });
        });
    }
}

export const removeFoodEntry = (entryID) => (dispatch) => {
    dispatch({
        type: REMOVE_FROM_MEALS,
        payload: {
            entryID: entryID
        }
    });
};

export const setFoodSearchItem = (food) => (dispatch) => {
    dispatch({
        type: SET_FOOD_SEARCH_ITEM,
        payload: food
    });
};

export const setFoodEntry = (workingFood) => (dispatch) => {
    dispatch({
        type: SET_FOOD_ENTRY,
        payload: workingFood
    });
}

export const setUpdateFoodEntry = (column, columnValue) => (dispatch) => {
    dispatch({
        type: SET_FOOD_ENTRY_DATA,
        payload: {
            column: column,
            columnValue: columnValue
        }
    });
}

export const clearFoodEntry = () => (dispatch) => {
    dispatch({
        type: CLEAR_FOOD_ENTRY_DATA
    });
}

export const addToMeals = (meal) => (dispatch) => {
    dispatch({
        type: ADD_TO_MEALS,
        payload: meal
    });
}

export function fetchLogs(user_id) {
    return function(dispatch) {
        ClientFoodUserService.getUsersMeals(user_id)
        .then(meals => {
            // Response is object of food entries, grouped by meal name
            dispatch({
                type: "GET_INIT_LOGS",
                payload: meals
            });
        });
    }
}