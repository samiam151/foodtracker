const { database } = require("../../conifg/db");
const FoodUserService = {};
const moment = require("moment");
const FoodEntry = require("../models/foodEntry.js");

FoodUserService.getLog = (user_id, date = null) => {
    return new Promise((resolve, reject) => {
        database.connect((err, client) => {
            if(err) {
                client.release();
                reject(err)
            };

            let queryParameters = `${user_id}`;
            if (date) queryParameters += `, '${date}'`;

            let query = `select * from fn_get_food_entries(${queryParameters})`;

            client.query(query)
                .then(data => {
                    client.release();
                    resolve(data.rows); 
                });
        });
    });
}

FoodUserService.addEntry = (initObj) => {
    let foodEntry = new FoodEntry(initObj);

    return new Promise((resolve, reject) => {
        database.connect((err, client) => {
            if(err) {
                client.release();
                reject(err)
            };
            
            let query = `
                insert into public.food_entries 
                (user_id, food_id, meal_name, quantity, calories, food_name, measure)
                values ($1, $2, $3, $4, $5, $6, $7)
                returning *`;

            client.query(query, foodEntry.toArray())
                .then(data => {
                    client.release();
                    resolve(foodEntry);
                })
                .catch(err => {
                    client.release();
                    console.log(err);
                    reject(err);
                })
        });
    });
}

FoodUserService.removeEntry = (entryID) => {
    return new Promise((resolve, reject) => {
        database.connect((err, client) => {
            if(err) {
                client.release();
                reject(err)
            };

            let query = `delete from public.food_entries where id = $1`;
            client.query(query, [entryID])
                .then(data => {
                    client.release();
                    resolve(data);
                })
                .catch(err => {
                    client.release();
                    console.log(err);
                    reject(err);
                })
        })
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