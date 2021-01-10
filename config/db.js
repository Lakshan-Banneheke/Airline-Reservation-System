const postgres = require('postgres');

const sql = postgres(process.env.DATABASE_URL);

module.exports = sql;
