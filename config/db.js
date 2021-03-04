const { Pool } = require('pg');
let pool;

if (process.env.NODE_ENV !== 'production'){
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });
} else {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}



module.exports = pool;
