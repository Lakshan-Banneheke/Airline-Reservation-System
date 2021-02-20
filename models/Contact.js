const pool = require('../config/db');

class Contact {
    static async getContactDetails(){
        const query = 'SELECT * FROM organizational_info;';
        const result = await pool.query(query, []);
        return result.rows;
    }
}
module.exports = Contact;
