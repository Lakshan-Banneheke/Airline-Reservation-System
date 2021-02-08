const {GuestInfo} = require('./validators/guestInfo');
const BookingService = require('../services/BookingServices');

class BookingController {
    static async getBooking(req, res) {
        // console.log(req.params.schedule_id);
        let schedule_id = 1;
        const seats = await BookingService.getSeats(schedule_id);

        res.render('booking', {
            schedule_id : schedule_id,
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

    static async createBooking(req, res) {
        // try {
        //     const { value, error } = await GuestInfo.validate(req.body);
        //     if (error) throw (error);
        //     await CustomerService.register(value);
        //
        //     return res.status(200).send({ result: 'redirect', url: '/confirm-payment' });
        // } catch (err) {
        //     return res.redirect();
        // }

    }
}

module.exports = BookingController;
