const pool = require('../config/db');

class Airport {
    static async getAllAirportCodes() {
        const query = 'SELECT airport_code FROM airport ORDER BY airport_code';
        const result = await pool.query(query);
        return result.rows;
    }
}

module.exports = Airport;
