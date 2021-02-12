const FlightService = require('../services/flightServices');
// const logger = require('../config/logger');

class FlightController {
    static async getFlightByFilter(req, res) {
        try {
            // eslint-disable-next-line max-len
            const allFlights = await FlightService.getAllFlightsByFilter(req.param('booking_date_from'), req.param('from'), req.param('to'));
            const upcomingFlights = await FlightService.getAllFlights();
            const airports = await FlightService.getLocation();
            res.render('flight_search', {
                error: req.query.error,
                success: req.query.success,
                allFlights,
                upcomingFlights,
                airports,
                user: req.session.user,
                registrationError: req.query.registrationError,
                loginError: req.query.loginError,
                regemail: req.query.email,
                regfirstName: req.query.firstName,
                reglastName: req.query.lastName,
                regdob: req.query.dob,
                reggender: req.query.gender,
                regcontactNo: req.query.contactNo,
                regpassportNo: req.query.passportNo,
                regaddressLine1: req.query.addressLine1,
                regaddressLine2: req.query.addressLine2,
                regcity: req.query.city,
                regcountry: req.query.country,
            });
        } catch (e) {
            console.log(e);
            res.render('500');
        }
    }

    static async getFlightByID(req, res) {
        try {
            const flight = await FlightService.getFlightByID;
            res.render('flight_search', {
                flight,
            });
        } catch (e) {
            console.log(e);
            res.render('500');
        }
    }
}
module.exports = FlightController;
