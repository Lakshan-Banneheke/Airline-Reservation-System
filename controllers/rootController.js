class RootController {
    static async root(req, res) {
        res.render('index', {
            user: req.session.user,
            registrationError: req.query.registrationError,
            loginError: req.query.loginError,
        });
    }
}

module.exports = RootController;
