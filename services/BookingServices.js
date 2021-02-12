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

    static async getPrice(booking_id){
        return Booking.getPrice(booking_id);
    }

    static async successBooking(booking_id){
        return Booking.successBooking(booking_id);
    }

    static async cancelBooking(booking_id){
        return Booking.cancelBooking(booking_id);
    }
}

module.exports = BookingService;
