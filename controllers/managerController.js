const StaffService = require('../services/StaffServices');
const ReportService = require('../services/ReportService');
const Errors = require('../helpers/error');
const { passengerCountReport } = require('./validators/reports');

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
            const airportCodes = await StaffService.getAllAirportCodes();
            const routes = await StaffService.getAllRoutes();
            res.render('staff_manager_reports',{
                user: req.session.user,
                error: req.query.error,
                success: req.query.success,
                passenger_count_to_dest:null,
                booking_count:null,
                routes,
                models,
                airportCodes,
            })
        }catch(e){
            console.log(e)
            res.render('500');
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

    static async getPassengerCountToDest(req,res){
        try{
            const {value,error}=await passengerCountReport.validate(req.body);
            if(error) throw error;
            const result = await ReportService.getNumberOfPassengersTravellingToGivenDest(value);
            res.status(200).send({message:`Number of passengers travelling to ${req.body.passenger_count_airport_code} 
                between ${req.body.passenger_count_start_date} and ${req.body.passenger_count_end_date} is ${result.count}`},
                
            );
        }catch(e){
            console.log(e)
            res.render("500")
        }
    }
    static async getBookingCountByPassengerType(req,res){
        try{
            const result = await ReportService.numberOfBookingsByEachPassengerType(req.body);
            res.status(200).send({start:req.body.booking_count_start_date,end:req.body.booking_count_end_date,result:result}
                
            );
        }catch(e){
            console.log(e)
            res.render("500")
        }
    }

    static async getPassengerDetailsPage(req,res){
        try{
            if(req.body.route_code===''){
                throw new Errors.BadRequest('Invalid Route ID');
            }
            const passengers = await ReportService.getPassengerDetailsOnNextFlightOnGivenRoute(req.body.route_code)
            res.render('staff_manager_next_flight_passenger_details',{
                error:req.query.error,
                success:req.query.success,
                user:req.session.user,
                adultPassengers:passengers.filter((passenger)=>passenger.age>18),
                minorPassengers:passengers.filter((passenger)=>passenger.age<=18),
            })
        }catch(e){
            res.redirect(`/staff/manager/reports?error=${e}`)
        }
    }
}

module.exports = ManagerController;
