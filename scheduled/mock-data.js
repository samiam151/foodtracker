const { database } = require("../conifg/db");

database.connect((err, client) => {
    if (err) {
        console.log(err);
        return;
    }

    let query ='select public.pr_add_mock_data_for_all_users()';
    client.query(query)
    .then(() => {
        client.release();
        console.log("Successfully added mock data for all users.")
    })
    .catch(err => {
        client.release();
        console.log("Error adding mock all data.")
        console.log(err);
    })
})
