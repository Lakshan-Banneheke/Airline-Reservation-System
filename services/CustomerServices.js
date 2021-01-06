const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Errors = require('../helpers/error');
const Customer = require('../models/Customer');

class CustomerService {
    static async register({
        name,dob,gender,email,contactNo,country,passportNo,password,confrimPassword,
    }) {
        if (!crypto.timingSafeEqual(Buffer.from(password), Buffer.from(confrimPassword))) {
            throw new Errors.BadRequest('Password does not match retype password');
        }

        
        const isRegistered = await Customer.isEmailRegistered(email);
        if (isRegistered) {
            throw new Errors.BadRequest('Email is already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return Customer.registerCustomer(name,dob,gender,email,contactNo,country,passportNo,hashedPassword);
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

    static async logout() {}
}

module.exports = CustomerService;