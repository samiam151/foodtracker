import axios from "axios";

export function addWeightEntry(user_id, newWeight) {
    return axios({
        method: "post",
        url: "/api/weight/add",
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            userID: user_id,
            weight: newWeight
        }
    }).then(response => {
        return response.data;
    });
}