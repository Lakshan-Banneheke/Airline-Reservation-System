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
            custName: req.query.custName,
            address: req.query.address,
            custDob: req.query.custDob,
            custGender: req.query.custGender,
            custPassport: req.query.custPassport,
            mobile: req.query.mobile,
            custEmail: req.query.custEmail,
        });
    }

    static async createBooking(req, res) {
        try {
            // const { value, error } = await GuestInfo.validate(req.body);
            // if (error) throw (error);
            await BookingService.createBooking(req.body);
            return res.status(200).send({ result: 'redirect', url: '/confirm-payment' });
        } catch (err) {
            return res.status(200).send({ result: 'redirect',  url: `/?registrationError=${err}
                &custEmail=${req.body.custEmail}&custName=${req.body.custName}&custDob=${req.body.custDob}&custGender=${req.body.custGender}&mobile=${req.body.mobile}&custPassport=${req.body.custPassport}&address=${req.body.address}
            ` });
        }
    }
}

module.exports = BookingController;
