class RootController {
    static async root(req, res) {
        if (req.session.user == null) {
            res.render('index',{user:req.session.user,
                registrationError:req.query.registrationError,
                loginError:req.query.loginError,
            });
            return;
        }
    }
}


module.exports = RootController;