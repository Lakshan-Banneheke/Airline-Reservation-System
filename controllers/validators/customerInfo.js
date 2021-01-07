const Joi = require('joi');

const CustomerRegInfo = Joi.object(
).options({ abortEarly: false }).keys({
    name: Joi.string().required(),
    dob: Joi.date().required(),
    gender: Joi.string().required().valid('Male', 'Female', 'Other'),
    email: Joi.string().email().required(),
    contactNo: Joi.string().trim().required().label('Contact Number'),
    country: Joi.string().required(),
    passportNo: Joi.string().required().label('Passport Number'),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Password Conformation'),

});

const CustomerLoginInfo = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = { CustomerRegInfo, CustomerLoginInfo };
