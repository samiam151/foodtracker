let initialState = {
    user: null,
    isAuthenticated: false
}

export const userReducer = (state = initialState, action) => {
    if (action.type === "USER__UPDATE") {
        let newState = Object.assign({}, state, action.payload);
        return newState;
    }
    return state;
};