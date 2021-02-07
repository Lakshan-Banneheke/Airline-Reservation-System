const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Errors = require('../helpers/error');
const Customer = require('../models/Customer');

class CustomerService {
    static async register({
        // name, dob, gender, email, contactNo, country, passportNo, password, confrimPassword,
        email, password, confirmPassword, firstName, lastName, dob,
        gender, contactNo, passportNo, addressLine1, addressLine2, city, country,
    }) {
        if (!crypto.timingSafeEqual(Buffer.from(password), Buffer.from(confirmPassword))) {
            throw new Errors.BadRequest('Password does not match retype password');
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        return Customer.registerCustomer(
            email, hashedPassword, firstName, lastName, dob,
            gender, contactNo, passportNo, addressLine1, addressLine2, city, country,
        );
    }

    static async login({ email, password }) {
        const customer = await Customer.getRegisteredCustomerByEmail(email);
        if (!customer) {
            throw new Errors.BadRequest('Email is not registered');
        }

        const hashedPassword = customer.password;
        const passwordCorrect = await bcrypt.compare(password, hashedPassword);
        if (!passwordCorrect) {
            throw new Errors.BadRequest('Invalid Email or Password');
        }

        return customer;
    }
}

module.exports = CustomerService;
