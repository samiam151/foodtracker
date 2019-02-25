const db = require("../../conifg/db");
const FoodUserService = {};
const moment = require("moment");

FoodUserService.getLog = (user_id, date = null) => {
    return new Promise((resolve, reject) => {
        db.database.connect((err, client) => {
            if(err) {
                client.release();
                reject(err)
            };

            let query = `select * from food_entries where user_id = ${user_id}`;
            if (date) {
                query += ` and entry_date = '${date}'`;
            }
            console.log(query);
            client.query(query)
                .then(data => {
                    client.release();
                    resolve(data.rows); 
                });
        });
    });
}

module.exports = FoodUserService;
if (require.main === module) {
    FoodUserService.getLog(17, "2019-02-23")
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });
}