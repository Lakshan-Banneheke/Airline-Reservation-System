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
}

module.exports = BookingService;
