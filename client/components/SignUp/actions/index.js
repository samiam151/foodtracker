// Types
export const SET_SIGNUP_PROPERTY = "SET_SIGNUP_PROPERTY";
export const CLEAR_SIGNUP_PROPERTIES = "CLEAR_SIGNUP_PROPERTIES";

// Dispatchers
export const setSignupProperty = (property, value) => (dispatch) => {
    dispatch({
        type: SET_SIGNUP_PROPERTY,
        payload: {
            "property": property,
            "value": value
        }
    })
}

export const clearSignupProperty = () => (dispatch) => {
    dispatch({
        type: CLEAR_SIGNUP_PROPERTIES
    })
}