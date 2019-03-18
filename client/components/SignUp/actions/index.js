// Types
export const SET_SIGNUP_PROPERTY = "SET_SIGNUP_PROPERTY";

// Dispatchers
export const setSignupProperty = (property, value) => (dispatch) => {
    console.log("ssprop", property, value)
    dispatch({
        type: SET_SIGNUP_PROPERTY,
        payload: {
            "property": property,
            "value": value
        }
    })
}