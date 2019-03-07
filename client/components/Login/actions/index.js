export const setUser =  (user) => (dispatch) => {
    return dispatch({payload: {...user, "isAuthenticated": true}, type: "USER__UPDATE"})
};