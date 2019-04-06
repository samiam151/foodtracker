import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { userReducer, workoutReducer } from "../components/Login/reducers";
import { loggingReducers } from "../components/Logging/reducers"
import { modalReducer } from "../components/Utilites/reducers";
import { signupReducer } from "../components/SignUp/reducers";
import { rssFeedReducer } from "../components/Utilites/reducers/rssFeed";

let defaultState = {};
let middleware = [thunk];

const rootReducer = combineReducers({
    user: userReducer,
    logging: loggingReducers,
    modal: modalReducer,
    signup: signupReducer,
    rss: rssFeedReducer,
    workouts: workoutReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer, 
    defaultState,
    composeEnhancers(
        applyMiddleware(...middleware)
    )
);