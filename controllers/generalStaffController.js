const StaffService = require('../services/StaffServices');

class GeneralStaffController {
    static async homePage(req, res) {
        try {
            const assignedAirport = req.session.user.staffData.assigned_airport;
            const incomingFlights = await StaffService.getincomingPendingFlights(assignedAirport);
            const departingFlights = await StaffService.getToBeDepartedFlights(assignedAirport);
            res.render('staff_general_home', {
                user: req.session.user,
                error: req.query.error,
                success: req.query.success,
                incomingFlights,
                departingFlights,
            });
        } catch (e) {
            console.log(e);
            res.render('500');
        }
    }

    static async arrivedFlightsPage(req, res){
        try {
            const assignedAirport = req.session.user.staffData.assigned_airport;
            const arrivedFlights = await StaffService.getArrivedFlights(assignedAirport);
            res.render('staff_general_arrived_flights', {
                user: req.session.user,
                error: req.query.error,
                success: req.query.success,
                arrivedFlights,
            });
        } catch (e) {
            console.log(e);
            res.render('500');
        }
    }

    // static async upcomingFlightsMain(req, res) {
    //     try {
    //         const assignedAirport = req.session.user.staffData.assigned_airport;
    //         const upcomingFlights = await StaffService.getUpcomingFlights(assignedAirport);
    //         res.render('staff_general_upcoming_flights_main', {
    //             user: req.session.user,
    //             error: req.query.error,
    //             success: req.query.success,
    //             upcomingFlights,
    //         });
    //     } catch (e) {
    //         console.log(e);
    //         res.render('500');
    //     }
    // }

    static async upcomingFlightsMain(req, res) {
        try {
            const assignedAirport = req.session.user.staffData.assigned_airport;
            const upcomingIncomingFlights = await StaffService.getUpcomingIncomingFlights(assignedAirport);
            const upcomingOutgoingFlights = await StaffService.getUpcomingOutgoingFlights(assignedAirport);
            res.render('staff_general_upcoming_flights_main', {
                user: req.session.user,
                error: req.query.error,
                success: req.query.success,
                upcomingIncomingFlights,
                upcomingOutgoingFlights
            });
        } catch (e) {
            console.log(e);
            res.render('500');
        }
    }

    // under development
    static async upcomingFlightsMore(req, res) {
        try {
            const moreInfoGeneral = await
            StaffService.getUpcomingFlightGeneralInfo(req.body.aircraft_id);
            res.render('staff_general_upcoming_flights_more', {
                user: req.session.user,
                error: req.query.error,
                success: req.query.success,
                moreInfoGeneral,
            });
        } catch (e) {
            console.log(e);
            res.render('500');
        }
    }

    static async markFlightArrival(req, res) {
        try {
            await StaffService.markFlightArrival(req.body.arrival_schedule_id);
            res.redirect('/staff/general?success=Flight Arrival Marked');
        } catch (e) {
            res.redirect(`/staff/general?error=${e}`);
        }
    }

    static async markFlightDeparture(req, res) {
        try {
            await StaffService.markFlightDeparture(req.body.departing_schedule_id);
            res.redirect('/staff/general?success=Flight Departure Marked');
        } catch (e) {
            res.redirect(`/staff/general?error=${e}`);
        }
    }
}

module.exports = GeneralStaffController;
