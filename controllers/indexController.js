const Flight = require('../models/Flight');
const Contact = require('../models/Contact');

class IndexController{
    static async getAbout(req, res) {
        res.render('about', {
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

    static async getContact(req, res) {
        const contactDetails = await Contact.getContactDetails();

        res.render('contact', {
            user: req.session.user,
            contactDetails: contactDetails[0],
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

    static async getAircraftDetails(req, res) {
        const aircraftDetails = await Flight.getAircraftDetails();

        res.render('aircraft_details', {
            user: req.session.user,
            aircraftDetails,
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

    static async getPrivacy(req, res) {
        res.render('privacy', {
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
module.exports = IndexController;