const sql = require('../config/db');

class Customer {
    static async getTypeCustomerById(id) {
        const [type] = await sql`
            SELECT type from Customer 
            WHERE customer_id=${id}
        `;
        return type;
    }

    static async getRegisteredCustomerByEmail(email) {
        const [customer] = await sql`
            SELECT * from Registered_Customer
            WHERE email=${email}
        `;
        return customer;
    }

    static async registerCustomer(
        // name, dob, gender, email, contactNo, nationality, passportNo, password,
        email, password, firstName, lastName, dob,
        gender, contactNo, passportNo, addressLine1, addressLine2, city, country,
    ) {
        const [createdCustomer] = await sql`
            Call Procedure registerCustomer
                ( ${email},${password},${firstName},${lastName},${dob},${gender},${contactNo},${passportNo},${addressLine1},${addressLine2},${city},${country})
            `;
        return createdCustomer;
    }

    static async isEmailRegistered(email) {
        const [customer] = await sql`
            SELECT customer_id FROM Registered_Customer
            WHERE email=${email}
            LIMIT 1
        `;
        return customer != null;
    }
}

module.exports = Customer;
