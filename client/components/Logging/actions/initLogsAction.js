import ClientFoodUserService from "../../../services/ClientFoodUserService";
import { GET_INIT_LOGS } from "./types";

export function getTodaysLogs() {
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