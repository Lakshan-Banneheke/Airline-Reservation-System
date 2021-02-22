const { CustomerRegInfo, CustomerLoginInfo } = require('./validators/customerInfo');
const CustomerService = require('../services/CustomerServices');

class CustomerController {
    static async register(req, res) {
        try {
            const { value, error } = await CustomerRegInfo.validate(req.body);
            if (error) throw (error);
            await CustomerService.register(value);
            // automatic login after register
            const customer = await CustomerService.login(value);
            req.session.user = {};
            req.session.user.type = customer.type;
            req.session.user.customerData = customer;
            return res.status(200).send({ result: 'redirect', url: '/' });
        } catch (err) {
            return res.status(200).send({
                result: 'redirect',
                url: `/?registrationError=${err}
                &email=${req.body.email}&firstName=${req.body.firstName}&lastName=${req.body.lastName}&dob=${req.body.dob}&gender=${req.body.gender}&contactNo=${req.body.contactNo}&passportNo=${req.body.passportNo}&addressLine1=${req.body.addressLine1}&addressLine2=${req.body.addressLine2}&city=${req.body.city}&country=${req.body.country}#signup`,
            });
        }
    }

    static async login(req, res) {
        try {
            const { value, error } = await CustomerLoginInfo.validate(req.body);
            if (error) throw (error);
            const customer = await CustomerService.login(value);
            req.session.user = {};
            req.session.user.type = customer.type;
            req.session.user.customerData = customer;
            res.redirect('/');
        } catch (err) {
            res.redirect(`/?loginError=${err}#login`);
        }
    }

    static async logout(req, res) {
        try {
            req.session.user = undefined;
            res.redirect('/');
        } catch (err) {
            res.redirect('/');
        }
    }

    static async viewEditProfile(req, res) {
        res.render('editProfile', {
            // pass these to every page as you can register or login from any page
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

    static async editProfile(req, res) {
        try {
            await CustomerService.editProfile(req.body);
            const customer = await CustomerService.getRegisteredCustomerByID(req.body.custID);
            req.session.user.customerData = customer;
            return res.status(200).send({ result: 'redirect', url: '/' });
        } catch (err) {
            return res.status(200).send({
                result: 'redirect',
                url: `/customer/editProfile?registrationError=${err}`
            });
        }
    }

    static async changePassword(req, res) {
        try {
            await CustomerService.changePassword(req.body);
            const customer = await CustomerService.getRegisteredCustomerByID(req.body.custID);
            req.session.user.customerData = customer;
            return res.status(200).send({ result: 'redirect', url: '/' });
        } catch (err) {
            return res.status(200).send({
                result: 'redirect',
                url: `/customer/editProfile?registrationError=${err}`
            });
        }
    }


}

module.exports = CustomerController;
