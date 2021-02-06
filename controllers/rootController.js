class RootController {
    static async root(req, res) {
        res.render('index', {
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
        // res.render('general_staff_new_home',{
        //     user: req.session.user,
        //     error: req.query.error,
        //     success: req.query.success});
    }
}

module.exports = RootController;
