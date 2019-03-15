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

        createUser: (username, password, birthday) => {
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
                    birthday: birthday
                }
            }).then(response => {
                return response.data;
            }).catch(err => console.log(err));
        }
    }
})();

export default ClientUserService;