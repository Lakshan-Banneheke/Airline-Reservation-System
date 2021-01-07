 const { CustomerRegInfo,CustomerLoginInfo } = require('./validators/customerInfo');
const CustomerService = require('../services/CustomerServices');
const { defaultLogger } = require('../config/logger');

const logger = defaultLogger('customer-controller');

class CustomerController {

    static async register(req, res) {
        try {
            const { value, error } = await CustomerRegInfo.validate(req.body);
            if (error) throw (error);
            await CustomerService.register(value);
            //automatic login after register
            const customer = await CustomerService.login(value);
            req.session.user = {};
            req.session.user.email = customer.email;
            req.session.user.id = customer.customer_id;
            res.redirect('/');
        } catch (err) {
            //logger.error(err);
            res.redirect(`/?registrationError=${err}#signup`);
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
            //logger.error(err);
            res.redirect(`/?loginError=${err}`);
        }
    }

    static async logout(req, res) {
        try {
            await CustomerService.logout();
            req.session.user = undefined;
            res.redirect('/');
        } catch (err) {
            //logger.error(err);
            res.redirect('/');
        }
    }
}

module.exports = CustomerController;