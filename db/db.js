
const { Pool } = require("pg")
const pg = new Pool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	// ssl: {
	// 	rejectUnauthorized: false,
	// },
	min: 8,
	max: 20,
	application_name: 'cilsa'
})
pg.connect()

module.exports = pg
