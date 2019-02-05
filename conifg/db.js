const dotenv = require('dotenv');
dotenv.config();
const { Client, Pool } = require('pg');
const UserService = {};
const { DATABASE_URL } = process.env;
let DB = {};
const db = new Pool({
    connectionString: DATABASE_URL,
    ssl: true
});

db.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
});


DB.database = db;
// DB.query = function(query, sucessCallback, failureCallback) {
// DB.query = function() {
//     var args = arguments;
//     return db.connect().then(client => {
//         return client.query.apply(null, arguments)
//             .then(res => {
//                 client.release()
//                 args.sucessCallback(res);
//             })
//             .catch(err => {
//                 client.release()
//                 args.failureCallback(err);
//             });
//     });
// };

module.exports = DB;