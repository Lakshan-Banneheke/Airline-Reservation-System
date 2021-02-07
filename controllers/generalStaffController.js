class GeneralStaffController {
    static async homePage(req, res) {
        // res.render('staff_general_home', {
        //     user: req.session.user,
        //     error: req.query.error,
        //     success: req.query.success,
        // });
        res.render('staff_general_home', {
            user: req.session.user,
            error: req.query.error,
            success: req.query.success,
        });
    }

    static async upcomingFlightsMain(req, res) {
        res.render('staff_general_upcoming_flights_main', {
            user: req.session.user,
            error: req.query.error,
            success: req.query.success,
        });
    }

    static async upcomingFlightsMore(req, res) {
        res.render('staff_general_upcoming_flights_more', {
            user: req.session.user,
            error: req.query.error,
            success: req.query.success,
        });
    }
}

module.exports = GeneralStaffController;
