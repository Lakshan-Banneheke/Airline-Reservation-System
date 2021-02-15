const Joi = require('joi');

const CustomerRegInfo = Joi.object(
).options({ abortEarly: false }).keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Password Conformation'),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dob: Joi.string().required(),
    gender: Joi.string().required().valid('Male', 'Female', 'Other'),
    contactNo: Joi.string().trim().required().label('Contact Number'),
    passportNo: Joi.string().required().label('Passport Number'),
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
});

const CustomerLoginInfo = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = { CustomerRegInfo, CustomerLoginInfo };
