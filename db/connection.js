const sql = require('mysql');
const util = require('util');

const connection = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "gemini253",
    database: "homeworkdb"
});

connection.connect();
connection.query = util.promisfy(connection.query);

module.exports = connection;