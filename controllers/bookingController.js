const {GuestInfo} = require('./validators/guestInfo');
const BookingService = require('../services/BookingServices');

class BookingController {

    static async getBooking(req, res) {
        // console.log(req.params.schedule_id);
        let schedule_id;
        if (typeof req.body.schedule_id !== 'undefined') {
            schedule_id = req.body.schedule_id;
        } else {
            schedule_id = req.query.schedule_id;
        }


        const flightInfo = await BookingService.getFlightInfo(schedule_id);
        const seat_info = await BookingService.getSeats(schedule_id);

        res.render('booking', {
            schedule_id : schedule_id,
            user: req.session.user,
            seat_info: seat_info,
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
            flightInfo: flightInfo[0],
            priceInfo: flightInfo[1]
        });
    }

    static async createBooking(req, res) {
        try {
            // const { value, error } = await GuestInfo.validate(req.body);
            // if (error) throw (error);
            let booking_id = await BookingService.createBooking(req.body);
            req.session.booking_id = booking_id.insertbooking;
            return res.status(200).send({ result: 'redirect', url: '/payment' });
        } catch (err) {
            return res.status(200).send({ result: 'redirect',  url: `/?registrationError=${err}
                &custEmail=${req.body.custEmail}&custName=${req.body.custName}&custDob=${req.body.custDob}&custGender=${req.body.custGender}&mobile=${req.body.mobile}&custPassport=${req.body.custPassport}&address=${req.body.address}&schedule_id=${req.body.schedule_id}
            ` });
        }
    }

    static async getPayment(req, res) {
        let price = await BookingService.getPrice(req.session.booking_id);
        res.render('payment', {
            user: req.session.user,
            price: price.total_price,
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


    static async cancelPayment(req, res) {
        try{
            await BookingService.cancelBooking(req.session.booking_id);
            res.render('payment_cancel', {
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
        }catch (error){
            console.log(error);
            return res.redirect("/booking/payment?dbError=${error}");
        }
    }

    static async paymentSuccess(req, res) {
        try{
            await BookingService.successBooking(req.session.booking_id);
            res.render('payment_successful', {
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
        }catch (error){
            console.log(error);
            return res.redirect("/booking/payment?dbError=${error}");
        }


    }
}

module.exports = BookingController;
