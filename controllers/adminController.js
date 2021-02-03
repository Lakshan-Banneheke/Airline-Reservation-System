class AdminController {
    static async homePage(req, res) {
        res.render('staff_admin_home', {
            user: req.session.user,
            error: req.query.error,
            success: req.query.success,
        });
    }
}

module.exports = AdminController;
