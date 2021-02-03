const pool = require('../config/db');

class Customer {
    static async getTypeCustomerById(id) {
        const query = 'SELECT type FROM customer WHERE customer_id=$1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async getRegisteredCustomerByEmail(email) {
        const query = 'SELECT * FROM Registered_Customer INNER JOIN Customer USING(customer_id) WHERE email=$1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    }

    static async registerCustomer(
        // name, dob, gender, email, contactNo, nationality, passportNo, password,
        email, password, firstName, lastName, dob,
        gender, contactNo, passportNo, addressLine1, addressLine2, city, country,
    ) {
        const query = 'CALL registerCustomer ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)';
        await pool.query(query,
            [email, password, firstName, lastName, dob,
                gender, contactNo, passportNo, addressLine1, addressLine2, city, country]);
    }

    static async isEmailRegistered(email) {
        const query = 'SELECT customer_id FROM Registered_Customer WHERE email=$1 LIMIT 1';
        const result = await pool.query(query, [email]);
        return result.rows[0] != null;
    }
}

module.exports = Customer;
