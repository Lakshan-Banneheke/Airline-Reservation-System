const StaffService = require('../services/StaffServices');
const ReportService = require('../services/ReportService');
const Errors = require('../helpers/error');

class ManagerController {
    static async homePage(req, res) {
        try {
            const unverifiedStaff = await StaffService.getAllUnverifiedGeneralStaff();
            res.render('staff_manager_home', {
                user: req.session.user,
                error: req.query.error,
                success: req.query.success,
                unverifiedStaff,
            });
        } catch (e) {
            console.log(e);
            res.render('500');
        }
    }

    static async allFlightsPage(req, res) {
        try {
            const ongoingAllFlights = await StaffService.getAllOngoingFlights();
            const allUpcomingFlights = await StaffService.getAllUpcomingFlights();
            const allArrivedFlights = await StaffService.getAllArrivedFlights();

            res.render('staff_manager_all_flights', {
                user: req.session.user,
                error: req.query.error,
                success: req.query.success,
                ongoingAllFlights,
                allUpcomingFlights,
                allArrivedFlights,
            });
        } catch (e) {
            console.log(e);
            res.render('500');
        }
    }

    static async reportPage(req,res){
        try{
            const models = await ReportService.getRevenueForEachModel();
            res.render('staff_manager_reports',{
                user: req.session.user,
                error: req.query.error,
                success: req.query.success,
                models,
            })
        }catch(e){
            console.log(e)
            res.send(500).render('500');
        }
    }

    static async allGeneralStaffPage(req, res) {
        try {
            const staffMembers = await StaffService.getAllVerifiedGeneralStaff();
            const airportCodes = await StaffService.getAllAirportCodes();
            res.render('staff_manager_all_general_staff', {
                user: req.session.user,
                error: req.query.error,
                success: req.query.success,
                staffMembers,
                airportCodes,
            });
        } catch (e) {
            console.log(e);
            res.send(500).render('500');
        }
    }

    static async verifyStaff(req, res) {
        try {
            await StaffService.verifyStaff(req.body.empId);
            res.redirect('/staff/manager?success=Account Approval Successful.');
        } catch (e) {
            res.redirect(`/staff/manager?error=${e}`);
        }
    }

    static async deleteStaff(req, res) {
        try {
            await StaffService.deleteStaff(req.body.empId);
            res.redirect('/staff/manager?success=Account Disapproval Successful.');
        } catch (e) {
            res.redirect(`/staff/manager?error=${e}`);
        }
    }

    static async searchGeneralStaff(req, res) {
        try {
            let staffLike;
            if (req.query.query !== '') {
                staffLike = await StaffService.getGeneralStaffWhereNameLike(req.query.query);
            } else {
                staffLike = await StaffService.getAllVerifiedGeneralStaff();
            }

            const resObj = {
                success: true,
                staffMembers: staffLike,
            };
            res.json(resObj);
        } catch (e) {
            res.json({
                success: false,
                error: e,
            });
        }
    }

    static async changeAssignedAirportOfStaff(req, res) {
        try {
            if (req.body.airport === '') {
                throw new Errors.BadRequest('OOPS. Invalid Airport Code');
            }
            await StaffService.changeAssignedAirport(req.params.empId, req.body.airport);
            res.redirect('/staff/manager/all_general_staff?success=Assigned Airport Changed Auccessfully');
        } catch (e) {
            console.log(e);
            res.redirect(`/staff/manager/all_general_staff?error=${e}`);
        }
    }

    static async getAirportCodesJson(req, res) {
        try {
            const airportCodes = await StaffService.getAllAirportCodes();
            res.json({ airportCodes });
        } catch (e) {
            res.json({
                success: false,
                error: e,
            });
        }
    }
}

module.exports = ManagerController;
