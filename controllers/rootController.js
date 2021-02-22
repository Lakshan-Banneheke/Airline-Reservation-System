const CustomerService = require('../services/CustomerServices');
const FlightService = require('../services/flightServices');

class RootController {
    static async root(req, res) {
        const upcomingFlights = await FlightService.getAllFlights();
        const airports = await FlightService.getLocation();
        const reviews= await CustomerService.getReviews();
        res.render('index', {
            // pass these to every page as you can register or login from any page
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
    }
}

module.exports = RootController;
