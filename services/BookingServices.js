const Errors = require('../helpers/error');
const Booking = require('../models/Booking');

class BookingService {

    static async getSeats(schedule_id) {
        const seats = await Booking.getSeats(schedule_id);
        if (!seats) {
            throw new Errors.BadRequest('Schedule ID is incorrect.');
        }
        return seats;
    }

    static async createBooking(values){
        return Booking.createBooking(values);
    }

    static async getFlightInfo(schedule_id) {
        const flightInfo = await Booking.getFlightInfo(schedule_id);
        if (!flightInfo) {
            throw new Errors.BadRequest('Schedule ID is incorrect.');
        }
        return flightInfo;
    }
}

module.exports = BookingService;
