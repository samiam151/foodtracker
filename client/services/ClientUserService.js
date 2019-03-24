import axios from "axios";

const ClientUserService = (() => {

    return {
        authenticateUser: (username, password) => {
            return axios({
                method: "post",
                url: "/api/login",
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    username: username,
                    password: password
                }
            }).then(response => {
                return response.data;
            });
        },

        createUser: (username, password, birthday, weight, height, activityLevel, gender) => {
            console.log("birthday from client service", birthday)
            return axios({
                method: "post",
                url: "/api/signup",
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    username: username,
                    password: password,
                    birthday: birthday,
                    weight: weight, 
                    height: height, 
                    activityLevel: activityLevel, 
                    gender: gender
                }
            }).then(response => {
                return response.data;
            }).catch(err => console.log(err));
        },

        getUsernames: () => {
            return axios.get("/api/signup/names")
                .catch(err => {
                    console.log(err);
                    return err;
                })
                .then(res => res.data.names);

        },

        updateGoals: (user_id, target_weight, target_weekly_loss) => {
            return axios({
                method: "post",
                url: "/api/userinfo/goals/update",
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    user_id: user_id,
                    target_weight: target_weight,
                    target_weekly_loss: target_weekly_loss
                }
            }).then(response => {
                return response.data;
            }).catch(err => console.log(err));
        }
    }
})();

export default ClientUserService;