import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { userReducer } from "../components/Login/reducers";
import { loggingReducers } from "../components/Logging/reducers"
import { modalReducer } from "../components/Utilites/reducers";

let defaultState = {};
let middleware = [thunk];

const rootReducer = combineReducers({
    user: userReducer,
    logging: loggingReducers,
    modal: modalReducer
});

export const store = createStore(
    rootReducer, 
    defaultState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
);

// export const store = createStore(
//     rootReducer, 
//     defaultState,
//     compose (
//         applyMiddleware(...middleware)
//     )
// );