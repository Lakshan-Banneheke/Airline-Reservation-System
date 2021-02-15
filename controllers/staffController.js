const {
    StaffRegInfo, StaffLoginInfo, staffEditInfo, ChangePasswordInfo,
} = require('./validators/staffAuthInfo');
const StaffService = require('../services/StaffServices');

class StaffController {
    static async registerPage(req, res) {
        try {
            const airportCodes = await StaffService.getAllAirportCodes();
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
                airport: req.query.airport,
                airportCodes,
            });
        } catch (e) {
            console.log(e);
            res.send(500).render('500');
        }
    }

    static async editProfilePage(req, res) {
        try {
            res.render('staff_edit_profile', {
                user: req.session.user,
                error: req.query.error,
                success: req.query.success,
                pwd_error: req.query.pwd_error,
                pwd_success: req.query.pwd_success,
                del_acc_error: req.query.del_acc_error,
                firstName: req.session.user.staffData.first_name,
                lastName: req.session.user.staffData.last_name,
                email: req.session.user.staffData.email,
                contactNo: req.session.user.staffData.contact_no,
                country: req.session.user.staffData.country,
            });
        } catch (e) {
            console.log(e);
            res.send(500).render('500');
        }
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
            res.redirect(`/staff/register?error=${err}&firstName=${req.body.firstName}&lastName=${req.body.lastName}&empId=${req.body.empId}&category=${req.body.category}&gender=${req.body.gender}&dob=${req.body.dob}&email=${req.body.email}&contactNo=${req.body.contactNo}&country=${req.body.country}&securityKey=${req.body.securityKey}&airport=${req.body.airport}`);
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
            req.session.user.staffId = staff.emp_id;
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

    static async editProfileInfo(req, res) {
        try {
            const { value, error } = await staffEditInfo.validate(req.body);
            if (error) throw (error);
            await StaffService.editProfileInfo(req.params.emp_id, value);
            req.session.user.staffData.first_name = req.body.firstName;
            req.session.user.staffData.last_name = req.body.lastName;
            req.session.user.staffData.email = req.body.email;
            req.session.user.staffData.contact_no = req.body.contactNo;
            req.session.user.staffData.country = req.body.country;
            res.redirect('/staff/edit_profile?success=Changes Saved Successfully');
        } catch (e) {
            res.redirect(`/staff/edit_profile?error=${e}`);
        }
    }

    static async changePassword(req, res) {
        try {
            const { value, error } = await ChangePasswordInfo.validate(req.body);
            if (error) throw (error);
            await StaffService.changePassword(req.params.emp_id, value);
            res.redirect('/staff/edit_profile?pwd_success=Password Changed Successfully#changePassword');
        } catch (e) {
            res.redirect(`/staff/edit_profile?pwd_error=${e}#changePassword`);
        }
    }

    static async deleteOwnAccount(req, res) {
        try {
            await StaffService.deleteOwnAccount(req.params.emp_id, req.body.del_password);
            req.session.user = undefined;
            res.redirect('/staff/login?del_acc_success=Account Deleted Successfully');
        } catch (err) {
            res.redirect(`/staff/edit_profile?del_acc_error=${err}#delAccount`);
        }
    }
}

module.exports = StaffController;
