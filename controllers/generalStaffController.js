const StaffService = require('../services/StaffServices');
class GeneralStaffController {
    static async homePage(req, res) {
        try {
            const ongoingFlights = await StaffService.getOngoingFlights();
            console.log(ongoingFlights);
            res.render('staff_general_home', {
                user: req.session.user,
                error: req.query.error,
                success: req.query.success,
                ongoingFlights
            });
        } catch (e) {
            console.log(e);
            res.render('500');
        }
    }

    // static async homePage(req, res) {
    //     res.render('staff_general_home', {
    //         user: req.session.user,
    //         error: req.query.error,
    //         success: req.query.success,
    //     });
    // }

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
