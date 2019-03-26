import { Component } from "react";

// Action Types
export const SHOW_MODAL = "SHOW_MODAL";
export const SET_MODAL_CONTENT = "SET_MODAL_CONTENT";

export const defaultModalState = {
    show: false,
    content: null,
    name: ""
};

// Action Dispatchers
export const showModal = (name = "") => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        payload: {
            show: true,
            name: name
        }
    });
};

export const hideModal = () => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        payload: defaultModalState
    });
};

export const setContent = (component) => (dispatch) => {
    return dispatch({
        type: SET_MODAL_CONTENT,
        payload: component
    });
}