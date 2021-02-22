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

    static async getReviews(){
        return await Customer.getReviews();
        
    }

    static async createReview(custID,customer_review){
        try{
        const review= await Customer.createReview(custID,customer_review);
        return review;
        }catch(err){
            throw new Errors.InternalServerError('Number of characters cannot exceed 500');
        }
    

    }

    static async editProfile({
        custID, firstName, lastName, dob, gender, contactNo, passportNo, addressLine1, addressLine2, city, country,
      }) {
        return Customer.editProfile(
            firstName, lastName, dob, gender, contactNo, passportNo, addressLine1, addressLine2, city, country, custID
        );
    }

    static async changePassword({
          custID, currentPassword, newPassword1, newPassword2
      }) {
        if (!crypto.timingSafeEqual(Buffer.from(newPassword1), Buffer.from(newPassword2))) {
            throw new Errors.BadRequest('Password does not match retype password');
        }

        const customer = await Customer.getRegisteredCustomerByID(custID);
        if (!customer) {
            throw new Errors.BadRequest('Error');
        }

        const hashedCurrentPassword = customer.password;
        const passwordCorrect = await bcrypt.compare(currentPassword, hashedCurrentPassword);
        if (!passwordCorrect) {
            throw new Errors.BadRequest('Current password is incorrect');
        }

        const hashedPassword = await bcrypt.hash(newPassword1, 10);

        return Customer.changePassword(custID, hashedPassword);
    }

    static async getRegisteredCustomerByID(id) {
        return await Customer.getRegisteredCustomerByID(id);
    }
}

module.exports = CustomerService;
