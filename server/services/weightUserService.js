const { database } = require("../../conifg/db");
const WeightUserService = {};

WeightUserService.addWeightEntry = (userID, newWeight, entry_date) => {
    return new Promise((resolve, reject) => {
        database.connect((err, client) => {
            if(err) {
                client.release();
                console.log(err);
                reject(err);
            }
    
            let query = `
                select public.pr_create_weight_entry($1, $2, $3)
            `;
            client.query(query, [userID, newWeight, entry_date])
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
    });
}

module.exports = WeightUserService;