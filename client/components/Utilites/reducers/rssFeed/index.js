import { SET_RSS_CONTENT } from "../../actions/rssFeed";

const defaultState = {};

export const rssFeedReducer = (state = defaultState, action) => {
    if (action.type === SET_RSS_CONTENT) {
        return Object.assign({}, state, action.payload);
    }
    return state;
}