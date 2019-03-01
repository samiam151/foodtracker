import { SET_MODAL_CONTENT, SHOW_MODAL } from "../actions";

const defaultState = {
    show: false,
    content: null
}

export const modalReducer = (state = defaultState, action) => {
    if (action.type === SHOW_MODAL) {
        if (action.payload.show === true) {
            let modalObj = {
                show: true
            }
            if (action.payload.name) {
                modalObj['name'] = action.payload.name;
            }

            return Object.assign({}, state, modalObj);
        } 
        else {
            return Object.assign({}, state, {
                show: action.payload,
                content: null
            });
        }
    }

    if (action.type === SET_MODAL_CONTENT) {
        return Object.assign({}, state, {
            content: action.payload
        });
    }

    return state;
};