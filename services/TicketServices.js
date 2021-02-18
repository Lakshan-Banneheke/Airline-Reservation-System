const Errors = require('../helpers/error');
const Ticket = require('../models/Ticket');

class TicketService {
    static async getBookingDetails(booking_id) {
        return Ticket.getBookingDetails(booking_id);
    }
    static async getFlightInfo(schedule_id) {
        const flightInfo = await Ticket.getFlightInfo(schedule_id);
        if (!flightInfo) {
            throw new Errors.BadRequest('Schedule ID is incorrect.');
        }
        return flightInfo;
    }
    static async getTicketDetails(booking_id){
        return Ticket.getTicketDetails(booking_id);
    }
    static async getDiscount(booking_id){
        return Ticket.getDiscount(booking_id);
    }
}
module.exports = TicketService;