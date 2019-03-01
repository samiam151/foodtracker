let initialState = {
    user: ""
}

export const userReducer = (state = {}, action) => {
    if (action.type === "USER__UPDATE") {
        let newState = Object.assign({}, state, action.payload);
        return newState;
    }
    return state;
};