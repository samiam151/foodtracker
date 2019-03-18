import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { userReducer } from "../components/Login/reducers";
import { loggingReducers } from "../components/Logging/reducers"
import { modalReducer } from "../components/Utilites/reducers";
import { signupReducer } from "../components/SignUp/reducers";

let defaultState = {};
let middleware = [thunk];

const rootReducer = combineReducers({
    user: userReducer,
    logging: loggingReducers,
    modal: modalReducer,
    signup: signupReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer, 
    defaultState,
    composeEnhancers(
        applyMiddleware(...middleware)
    )
);

// export const store = createStore(
//     rootReducer, 
//     defaultState,
//     compose (
//         applyMiddleware(...middleware)
//     )
// );