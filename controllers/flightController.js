const CustomerService = require('../services/CustomerServices');
const FlightService = require('../services/flightServices');

class FlightController {
    static async getFlightByFilter(req, res) {
        try {
            // eslint-disable-next-line max-len
            const allFlights = await FlightService.getAllFlightsByFilter(req.query.booking_date_from, req.query.from, req.query.to);
            const upcomingFlights = await FlightService.getAllFlights();
            const airports = await FlightService.getLocation();
            const reviews=await CustomerService.getReviews();
            res.render('flight_search', {
                error: req.query.error,
                success: req.query.success,
                booking_date_from:req.query.booking_date_from,
                from:req.query.from,
                to:req.query.to,
                allFlights,
                upcomingFlights,
                airports,
                reviews,
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
