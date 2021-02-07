const Joi = require('joi');

const GuestInfo = Joi.object(
).options({ abortEarly: false }).keys({
    email: Joi.string().email().required(),
    fullName: Joi.string().required(),
    dob: Joi.string().required(),
    gender: Joi.string().required().valid('Male', 'Female', 'Other'),
    contactNo: Joi.string().trim().required().label('Contact Number'),
    passportNo: Joi.string().required().label('Passport Number'),
    address: Joi.string().required()
});

module.exports = {GuestInfo};
