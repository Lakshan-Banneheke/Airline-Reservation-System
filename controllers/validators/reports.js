const Joi = require('joi').extend(require('@joi/date'));

const passengerCountReport = Joi.object(
).options({ abortEarly: false }).keys({
    passenger_count_airport_code:Joi.string().required(),
    passenger_count_start_date: Joi.date().format('YYYY-MM-DD').utc().label('Date'),   
    passenger_count_end_date: Joi.date().format('YYYY-MM-DD').utc().label('Date'),
});


module.exports = {
    passengerCountReport
};
