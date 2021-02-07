class GeneralStaffController {
    static async homePage(req, res) {
        res.render('staff_general_home', {
            user: req.session.user,
            error: req.query.error,
            success: req.query.success,
        });
    }
}

module.exports = GeneralStaffController;
