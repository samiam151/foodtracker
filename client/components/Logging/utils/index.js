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
            weight: newWeight,
            entry_date: entry_date
        }
    }).then(response => {
        return response.data;
    });
}

export function addWorkoutEntry(user_id, calories_burned, entry_date) {
    return axios({
        method: "post",
        url: "/api/workouts/add",
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            user_id: user_id,
            calories_burned: calories_burned,
            entry_date: entry_date
        }
    }).then(response => {
        return response.data;
    });
}