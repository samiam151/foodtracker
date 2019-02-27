import { SET_MODAL_CONTENT, SHOW_MODAL } from "../actions";

const defaultState = {
    show: false,
    content: null
}

export const modalReducer = (state = defaultState, action) => {
    console.log(action);
    if (action.type === SHOW_MODAL) {
        if (action.payload === true) {
            return Object.assign({}, state, {
                show: action.payload
            });
        } 
        else {
            return Object.assign({}, state, {
                show: action.payload,
                content: null
            });
        }
    }

    if (action.type === SET_MODAL_CONTENT) {
        console.log(action);
        return Object.assign({}, state, {
            content: action.payload
        });
    }

    return state;
};