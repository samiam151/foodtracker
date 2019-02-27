// Action Types
export const SHOW_MODAL = "SHOW_MODAL";
export const SET_MODAL_CONTENT = "SET_MODAL_CONTENT";

// Action Dispatchers
export const showModal = () => (dispatch) => {
    console.log("hitt...");
    return dispatch({
        type: SHOW_MODAL,
        payload: true
    });
};

export const hideModal = () => (dispatch) => {
    console.log("hitt...");
    return dispatch({
        type: SHOW_MODAL,
        payload: false
    });
};

export const setContent = (component) => (dispatch) => {
    console.log("hitt...");
    return dispatch({
        type: SET_MODAL_CONTENT,
        payload: component
    });
}