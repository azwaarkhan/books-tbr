const Pool = require("pg").Pool;

const pool = new Pool({
	user: "postgres",
	password: "12345678", // own postgre password
	host: "localhost",
	port: 5432,
	database: "tbr",
});

module.exports = pool;
