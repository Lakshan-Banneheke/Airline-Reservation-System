const Joi = require('joi');

const CustomerRegInfo = Joi.object().keys({
    name:Joi.string().required(),
    dob:Joi.date().required(),
    gender: Joi.string().valid('Male','Female','Other').required(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().trim().required().length(10, 'utf8')
                .regex(/^\d+$/)
                .message('Enter a vaild Mobile Number'),
    country: Joi.string().required(),
    passportNo: Joi.string().required(),
    password: Joi.string().min(5).max(10).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    termsAgreement:Joi.bool().valid(true)
    
    
});

const CustomerLoginInfo = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});


module.exports = { CustomerRegInfo,CustomerLoginInfo };