import { GET_INIT_LOGS, SET_FOOD_SEARCH_ITEM } from "../actions/types"

const initLogsState = {};

export function loggingReducers(store = initLogsState, action) {
    if (action.type === GET_INIT_LOGS) {
        return Object.assign({}, store, {
            init_meals: action.payload
        });
    }

    if (action.type === SET_FOOD_SEARCH_ITEM) {
        return Object.assign({}, store, {
            search_food: action.payload
        });
    }

    return store;
}