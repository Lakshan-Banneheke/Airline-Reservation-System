class RootController {
    static async root(req, res) {
        res.render('index', {
            user: req.session.user,
            registrationError: req.query.registrationError,
            loginError: req.query.loginError,
            regname: req.query.name,
            regdob: req.query.dob,
            reggender: req.query.gender,
            regemail: req.query.email,
            regcontactNo: req.query.contactNo,
            regcountry: req.query.country,
            regpassportNo: req.query.passportNo,
        });
    }
}

module.exports = RootController;
