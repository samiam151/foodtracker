let initialState = {
    isAuthenticated: false
}
let initialWorkoutState = [];

export const userReducer = (state = initialState, action) => {
    if (action.type === "SET_USER") {
        let newState = Object.assign({}, state, action.payload);
        return newState;
    }
    if (action.type === "UNSET_USER") {
        let newState = Object.assign({}, {}, initialState);
        return newState;
    }
    return state;
};

export const workoutReducer = (state = initialWorkoutState, action) => {
    if (action.type === "SET_WORKOUTS") {
        let newState = Object.assign([], state, action.payload);
        return newState;
    }
    return state;
};