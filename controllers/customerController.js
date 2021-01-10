const { CustomerRegInfo, CustomerLoginInfo } = require('./validators/customerInfo');
const CustomerService = require('../services/CustomerServices');
// const { defaultLogger } = require('../config/logger');

// const logger = defaultLogger('customer-controller');

class CustomerController {
    static async register(req, res) {
        try {
            const { value, error } = await CustomerRegInfo.validate(req.body);
            if (error) throw (error);
            await CustomerService.register(value);
            // automatic login after register
            const customer = await CustomerService.login(value);
            req.session.user = {};
            req.session.user.email = customer.email;
            req.session.user.id = customer.customer_id;
            // res.redirect('/');
            return res.status(200).send({ result: 'redirect', url: '/' });
        } catch (err) {
            // logger.error(err);
            // res.redirect(`/?registrationError=${err}#signup`);
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
            req.session.user.email = customer.email;
            req.session.user.id = customer.customer_id;
            res.redirect('/');
        } catch (err) {
            // logger.error(err);
            res.redirect(`/?loginError=${err}`);
        }
    }

    static async logout(req, res) {
        try {
            await CustomerService.logout();
            req.session.user = undefined;
            res.redirect('/');
        } catch (err) {
            // logger.error(err);
            res.redirect('/');
        }
    }
}

module.exports = CustomerController;
