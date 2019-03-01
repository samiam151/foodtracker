export const setUser =  (user) => (dispatch) => {
    return dispatch({payload: {...user}, type: "USER__UPDATE"})
};