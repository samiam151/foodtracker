const UserService = {};
const db = require("../../conifg/db").database;
const bcrypt = require("bcrypt");
const numSalts = 10;
const fs = require("fs");
const path = require("path");

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

        db.connect()
            .then(client => {
                return client.query(query, [username])
                    .then(res => {
                        client.release()
                        let result = res.rows[0];
                        resolve(result);
                    })
                    .catch(err => {
                        client.release()
                        reject(err.stack);
                    })
            .catch(err => console.log(err));
        });
    });
};

UserService.getUserandGoals = (username) => {
    return new Promise((resolve, reject) => {
        if (!username) {
            throw new Error("no username given...");
        }
        let query = "SELECT * FROM public.user_goals WHERE name = $1";

        db.connect().then(client => {
            return client.query(query, [username])
                .then(res => {
                    client.release()
                    let result = res.rows[0];
                    // delete result.password;
                    resolve(result);
                })
                .catch(err => {
                    client.release()
                    reject(err.stack);
                });
        });
    });
};

UserService.getInitInfo = function(uid) {
    return new Promise((resolve, reject) => {
        if (!uid) {
            throw new Error("no username given...");
        }
        let query = `
            begin;
                select fn_get_init_user_info(${uid}, 'r1', 'r2');
                fetch all in "r1";
                fetch all in "r2";
            commit;
        `;

        db.connect().then(client => {
            return client.query(query)
                .then(responses => {
                    client.release();

                    let actualResults = responses.filter(res => res['command'] === "FETCH");
                    let returnResult = {
                        "user_goals": actualResults[0].rows[0],
                        "workouts": actualResults[1].rows
                    };
                    resolve(returnResult);
                })
                .catch(err => {
                    console.log(err);
                    client.release()
                    reject(err.stack);
                });
        });
    });
}

UserService.getUserNames = () => {
    return new Promise((resolve, reject) => {     
        db.connect()
            .then(client => {

                let query = `
                    SELECT array_agg(name) 
                    as names 
                    FROM public.users
                `;

                return client.query(query)
                    .then(res => {
                        client.release();
                        // console.log(res);
                        resolve(res.rows[0]);
                    })
                    .catch(err => {
                        client.release();
                        console.log(err);
                        reject(err);
                    });
            })
            .catch(err => console.log(err));  
    });
}

/**
 * Creates a user, given a username and password
 * @param {string} username
 * @param {string} password
 */
UserService.createUser = (username, password, birthday, weight, height, activityLevel, gender) => {
    let isFemale = gender.toUpperCase() === "M" ? false : true;
    return new Promise((resolve, reject) => {
        UserService.encryptPassword(password)
            .then(encryptedPassword => {
                db.connect()
                    .then(client => {
                        let query = 'select * from pr_create_new_user($1, $2, $3, $4, $5, $6, $7)';
                        return client.query(query, [username, encryptedPassword, birthday, weight, height, activityLevel, isFemale])
                            .then(res => {
                                client.release();
                                resolve(res.rows[0]);
                            })
                            .catch(err => {
                                client.release();
                                console.log(err);
                                reject(err);
                            });
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => reject(err));
    });
};

module.exports = UserService;