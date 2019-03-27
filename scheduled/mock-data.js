const { database } = require("../conifg/db");

database.connect((err, client) => {
    if (err) {
        console.log(err);
        return;
    }

    let query ='select public.pr_add_mock_food_data_for_all_users()';
    client.query(query)
    .then(() => {
        client.release();
        console.log("Successfully added mock food data for all users.")
    })
    .catch(err => {
        client.release();
        console.log("Error adding mock food data.")
        console.log(err);
    })
})
