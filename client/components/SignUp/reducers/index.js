import { 
    SET_SIGNUP_PROPERTY
 } from "../actions";


let defaultState = {};

export const signupReducer  = (store = defaultState, action) => {
    let type = action.type;
    
    if (type === SET_SIGNUP_PROPERTY) {
        return {
            ...store,
            [action.payload.property]: action.payload.value
        }
    }

    return store;
}