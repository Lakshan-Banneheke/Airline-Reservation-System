const StaffService = require('../services/StaffServices');
class GeneralStaffController {
    static async homePage(req, res) {
        try {
            const ongoingFlights = await StaffService.getOngoingFlights();
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


    static async upcomingFlightsMain(req, res) {
        try {
            const upcomingFlights = await StaffService.getUpcomingFlights();
            res.render('staff_general_upcoming_flights_main', {
                user: req.session.user,
                error: req.query.error,
                success: req.query.success,
                upcomingFlights
                });
        
        } catch (e) {
            console.log(e);
            res.render('500');
        }
    }

    //under development
    static async upcomingFlightsMore(req, res) {
        res.render('staff_general_upcoming_flights_more', {
            user: req.session.user,
            error: req.query.error,
            success: req.query.success,
        });
    }
}

module.exports = GeneralStaffController;
