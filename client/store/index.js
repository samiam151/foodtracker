import { createStore } from "redux";

let defaultState = {
    user: ""
}

export const store = createStore(
    function reducer(state = defaultState, action) {
        if (action.type === "USER__UPDATE") {
            let newState = Object.assign({}, state, {user: action.user});
            return newState;
        }
        return state;
    }
);