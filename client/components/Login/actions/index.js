export const setUser =  (user) => (dispatch) => {
    console.log(user);
    return dispatch({payload: {...user, "isAuthenticated": true}, type: "SET_USER"})
};

export const unsetUser = (user) => (dispatch) => {
    return dispatch({type: "UNSET_USER"})
};