import { GET_INIT_LOGS } from "../actions/types"

const initLogsState = {};

export function loggingReducers(store = initLogsState, action) {
    console.log(action);
    if (action.type === GET_INIT_LOGS) {
        return Object.assign({}, action.payload);
    }

    return store;
}