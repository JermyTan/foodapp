const { Pool } = require('pg');

// const dotenv = require('dotenv');

// dotenv.config();

// const databaseConfig = { connectionString: process.env.DATABASE_URL };
// const pool = new Pool(databaseConfig);

// Change database config details as appropriate
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'foodtruck',
    password: 'postgres',
    port: 5432
});

module.exports = pool;
