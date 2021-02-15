const Joi = require('joi');

const GuestInfo = Joi.object(
).options({ abortEarly: false }).keys({
    custEmail: Joi.string().email().required(),
    custName: Joi.string().required(),
    custDob: Joi.string().required(),
    custGender: Joi.string().required().valid('Male', 'Female', 'Other'),
    mobile: Joi.string().trim().required().label('Contact Number'),
    custPassport: Joi.string().required().label('Passport Number'),
    address: Joi.string().required()
});

module.exports = {GuestInfo};
