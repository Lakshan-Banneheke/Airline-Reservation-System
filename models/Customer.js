const sql = require('../config/db');

class Customer {
    static async getAnyCustomerById(id) {
        const [customer] = await sql`
            SELECT * from Customer 
            WHERE customer_id=${id}
        `;
        return customer;
    }

    static async getRegisteredCustomerByEmail(email) {
        const [customer] = await sql`
            SELECT * from Customer INNER JOIN Profile ON Customer.customer_id=Profile.customer_id
            WHERE email=${email}
        `;
        return customer;
    }

    static async registerCustomer(name,dob,gender,email,contactNo,country,passportNo,password) {
        //TODO: Impelement SQL TRANSACTIONS here and insert to cutsomer category
        const [createdCustomer] = await sql`
            INSERT INTO Customer 
                ( name,dob,gender,email,contact_no,country,passport_no,is_registered ) 
            VALUES 
                ( ${name},${dob},${gender},${email},${contactNo},${country},${passportNo},${true} )
            RETURNING *
            `;

            const[createdProfile]= await sql`
            INSERT INTO Profile
                ( customer_id,password ) 
            VALUES 
                (${createdCustomer.customer_id},${password} )
            RETURNING *
            `;
        return [createdCustomer,createdProfile];
    }

    static async isEmailRegistered(email) {
        const [customer] = await sql`
            SELECT customer_id FROM
            Profile INNER JOIN Customer ON Customer.customer_id=Profile.customer_id
            WHERE email=${email}
            LIMIT 1
        `;
        return customer != null;
    }
}

module.exports = Customer;