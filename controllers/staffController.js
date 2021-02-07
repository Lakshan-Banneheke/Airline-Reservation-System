const { StaffRegInfo, StaffLoginInfo } = require('./validators/staffAuthInfo');
const StaffService = require('../services/StaffServices');

class StaffController {
    static async registerPage(req, res) {
        res.render('staff_signup', {
            user: req.session.user,
            error: req.query.error,
            success: req.query.success,
            firstName: req.query.firstName,
            lastName: req.query.lastName,
            empId: req.query.empId,
            category: req.query.category,
            email: req.query.email,
            contactNo: req.query.contactNo,
            gender: req.query.gender,
            dob: req.query.dob,
            country: req.query.country,
            securityKey: req.query.securityKey,
        });
    }

    static async loginPage(req, res) {
        res.render('staff_login', {
            user: req.session.user,
            error: req.query.error,
            success: req.query.success,
            empId: req.query.empId,
        });
    }

    static async register(req, res) {
        try {
            const { value, error } = await StaffRegInfo.validate(req.body);
            if (error) throw (error);
            await StaffService.register(value);
            res.redirect('/staff/login?success=Registration Successful.NOTE: If you are not an admin you may have to wait till your account is verfified before login');
        } catch (err) {
            res.redirect(`/staff/register?error=${err}&firstName=${req.body.firstName}&lastName=${req.body.lastName}&empId=${req.body.empId}&category=${req.body.category}&gender=${req.body.gender}&dob=${req.body.dob}&email=${req.body.email}&contactNo=${req.body.contactNo}&country=${req.body.country}&securityKey=${req.body.securityKey}`);
        }
    }

    static async login(req, res) {
        try {
            const { value, error } = await StaffLoginInfo.validate(req.body);
            if (error) throw (error);
            const staff = await StaffService.login(value);
            req.session.user = {};
            req.session.user.type = 'staff';
            req.session.user.staff_category = staff.category; // admin,manager,general
            req.session.user.staffData = staff;
            res.redirect(`/staff/${staff.category}`);
        } catch (err) {
            res.redirect(`/staff/login?error=${err}&empId=${req.body.empId}`);
        }
    }

    static async logout(req, res) {
        try {
            req.session.user = undefined;
            res.redirect('/staff/login');
        } catch (err) {
            res.redirect(`/staff/${req.session.staff_category}?error=${err}`);
        }
    }
}

module.exports = StaffController;
