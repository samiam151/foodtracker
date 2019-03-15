const UserService = {};
const db = require("../../conifg/db").database;
const Auth = require("../../conifg/authentication");
const FoodService = require("../services/foodApiService");
const bcrypt = require("bcrypt");
const numSalts = 10;

/**
 * @param { string } password
 * @returns { Promise<string> }
 */
UserService.encryptPassword = (password) => {
    return bcrypt.hash(password, numSalts);
};

/**
 * @param {string} password
 * @returns { Promise<boolean> }
 */
UserService.verifyPassword = (user, password) => {
    return bcrypt.compare(password, user.password);
};

/**
 * Given a user id, retrieves the user
 * @param {string} username
 * @returns { Promise<Array> }
 */
UserService.getUser = (username) => {
    return new Promise((resolve, reject) => {
        if (!username) {
            throw new Error("no username given...");
        }
        let query = "SELECT * FROM public.users WHERE name = $1";

        db.connect().then(client => {
            return client.query(query, [username])
                .then(res => {
                    client.release()
                    let result = res.rows[0];
                    resolve(result);
                })
                .catch(err => {
                    client.release()
                    reject(err.stack);
                });
        });
    });
};

/**
 * Creates a user, given a username and password
 * @param {string} username
 * @param {string} password
 */
UserService.createUser = (username, password, birthday) => {
    console.log("birthday from service server", birthday);
    return new Promise((resolve, reject) => {
        UserService.encryptPassword(password)
            .then(encryptedPassword => {
                db.connect()
                    .then(client => {
                        let query = 'INSERT INTO public.users (name, password, birthday) VALUES($1, $2, $3) RETURNING *';
                        return client.query(query, [username, encryptedPassword, birthday])
                            .then(res => {
                                client.release();
                                resolve(res.rows[0]);
                            })
                            .catch(err => {
                                client.release();
                                reject(err.stack);
                            });
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => reject(err));
    });
};

module.exports = UserService;