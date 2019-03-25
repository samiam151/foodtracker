const { database} = require("../../conifg/db");

const UserInfoService = {};

UserInfoService.getWeightData = (user_id) => {
    return new Promise((resolve, reject) => {
        database.connect((err, client) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            let query = `
                select weight_data as weight,
                    date_data as date
                from public.fn_get_weight_for_all_days($1)
            `;
            client.query(query, [user_id])
                .then(res => {
                    client.release();
                    resolve(res.rows);
                })
                .catch(err => {
                    client.release();
                    console.log(err);
                    reject(err);
                })
        })
    });
};

UserInfoService.getMainChartData = (user_id) => {
    return new Promise((resolve, reject) => {
        database.connect((err, client) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            let query = `
                select a.date_data as date,
                    weight_data as weight,
                    calories_data as calories,
                    workouts_data as calories_burned
                from fn_get_weight_for_all_days($1) a, 
                    fn_get_calories_for_all_days($1) b,
                    fn_get_workouts_for_all_days($1) c
                where a.date_data = b.date_data
                    and b.date_data = c.date_data
                order by 1
            `;
            client.query(query, [user_id])
                .then(res => {
                    client.release();
                    resolve(res.rows);
                })
                .catch(err => {
                    client.release();
                    console.log(err);
                    reject(err);
                })
        })
    });
}

UserInfoService.updateGoals = (user_id, tweight, twloss) => {
    return new Promise((resolve, reject) => {
        database.connect((err, client) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            let query = `
                select * from public.pr_update_user_goals($1, $2, $3)
            `;
            client.query(query, [user_id, tweight, twloss])
                .then(res => {
                    client.release();
                    resolve(res.rows[0]);
                })
                .catch(err => {
                   client.release()
                    console.log(err);
                    reject(err);
                });
        })
    });
}

module.exports = UserInfoService;