let initialState = {
    user: ""
}

export const userReducer = (state = initialState, action) => {
    if (action.type === "USER__UPDATE") {
        console.log(action);
        let newState = Object.assign({}, state, {user: action.payload});
        return newState;
    }
    return state;
};