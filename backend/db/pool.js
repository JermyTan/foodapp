const { Pool } = require('pg');
const db_key = require('./db-key.json');

// const dotenv = require('dotenv');

// dotenv.config();

// const databaseConfig = { connectionString: process.env.DATABASE_URL };
// const pool = new Pool(databaseConfig);

// Connect to db with credentials db_key
const pool = new Pool(db_key);

module.exports = pool;
