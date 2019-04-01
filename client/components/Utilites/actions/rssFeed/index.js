export const SET_RSS_CONTENT = "SET_RSS_CONTENT";

export const setRssContent = ({name, data}) => (dispatch) => {
    return dispatch({
        type: SET_RSS_CONTENT,
        payload: {
            [name]: data
        }
    });
}