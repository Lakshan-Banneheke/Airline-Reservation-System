const TicketService = require("../services/TicketServices");

class TicketController {
    static async printTicket(req,res){
        
        const ticketDetails =await TicketService.getTicketDetails(req.session.booking_id);
        const bookingDetails = await TicketService.getBookingDetails(req.session.booking_id);
        const discount=await TicketService.getDiscount(req.session.booking_id);
        const schedule_id=bookingDetails[0].schedule_id;
        const flightInfo = await TicketService.getFlightInfo(schedule_id);
        res.render('eTicket',{
            user: req.session.user,
                customerDetails:ticketDetails[0],
                modelDetails:ticketDetails[1],
                orgDetails:ticketDetails[2],
                bookingDetails: bookingDetails[1],
                flightInfo,
                discount,
                registrationError: req.query.registrationError,
                loginError: req.query.loginError,
                regemail: req.query.email,
                regfirstName: req.query.firstName,
                reglastName: req.query.lastName,
                regdob: req.query.dob,
                reggender: req.query.gender,
                regcontactNo: req.query.contactNo,
                regpassportNo: req.query.passportNo,
                regaddressLine1: req.query.addressLine1,
                regaddressLine2: req.query.addressLine2,
                regcity: req.query.city,
                regcountry: req.query.country,
        });
        
    }
}
module.exports = TicketController;