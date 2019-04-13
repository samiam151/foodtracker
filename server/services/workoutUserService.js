const { database } = require("../../conifg/db");
const WorkoutUserService = {};

WorkoutUserService.addWorkoutEntry = (user_id, calories_burned, entry_date) => {
    return new Promise((resolve, reject) => {
        database.connect((err, client) => {
            if(err) {
                client.release();
                console.log(err);
                reject(err);
            }
    
            let query = `
                select public.pr_create_workout_entry($1, $2, $3)
            `;
            client.query(query, [user_id, calories_burned, entry_date])
                .then(data => {
                    client.release();
                    resolve(data);
                })
                .catch(err => {
                    client.release();
                    console.log(err);
                    reject(err);
                });
        })
    })
}

module.exports = WorkoutUserService;