import { 
    GET_INIT_LOGS, 
    SET_FOOD_SEARCH_ITEM, 
    SET_FOOD_ENTRY_DATA, 
    SET_FOOD_ENTRY,
    CLEAR_FOOD_ENTRY_DATA,
    ADD_TO_MEALS,
    REMOVE_FROM_MEALS
} from "../actions/types"

const initLogsState = {
    meals: []
};

export function loggingReducers(store = initLogsState, action) {
    if (action.type === GET_INIT_LOGS) {
        return Object.assign({}, store, {
            meals: action.payload
        });
    }

    if (action.type === REMOVE_FROM_MEALS) {
        let entryID = action.payload.entryID;
        let newState = {
            ...store,
            meals: [
                ...store.meals
            ]
        }

        newState['meals'] = newState['meals'].filter(meal => meal.id !== entryID);
        return newState;
    }

    if (action.type === ADD_TO_MEALS) {
        let newState = {
            ...store,
            meals: [
                ...store.meals,
                action.payload
            ]
        }

        return newState;
    }

    if (action.type === SET_FOOD_SEARCH_ITEM) {
        return Object.assign({}, store, {
            search_food: action.payload
        });
    }

    if(action.type === SET_FOOD_ENTRY) {
        return Object.assign({}, store, {
            working_food: action.payload
        });
    }

    if(action.type === SET_FOOD_ENTRY_DATA) {
        let newState = Object.assign({}, store),
            { column, columnValue } = action.payload

        if (!newState["working_food_entry"]) {
            newState["working_food_entry"] = {};
        }

        newState["working_food_entry"][column] = columnValue;
        console.log(column, columnValue);
        return Object.assign({}, store, newState);
    }

    if(action.type === CLEAR_FOOD_ENTRY_DATA) {
        let newState = Object.assign({}, store);
        delete newState["working_food_entry"];
        delete newState["working_food"];

        return newState;
    }

    return store;
}