const pool = require('../config/db');

class Booking {
    static async getSeats(schedule_id) {
        const query_1 = 'SELECT economy_seat_capacity, business_seat_capacity, platinum_seat_capacity, economy_seats_per_row, business_seats_per_row, platinum_seats_per_row FROM aircraft_model NATURAL JOIN aircraft_instance NATURAL JOIN flight_schedule WHERE schedule_id=$1';
        const capacities = await pool.query(query_1, [schedule_id]);

        const query_2 = 'SELECT seat_id FROM seat_booking NATURAL JOIN seat_reservation WHERE schedule_id=$1';
        const booked_seats = await pool.query(query_2, [schedule_id]);

        const query_3 = 'SELECT model_id FROM aircraft_instance NATURAL JOIN flight_schedule WHERE schedule_id=$1';
        const model_id = await pool.query(query_3, [schedule_id]);

        return [capacities.rows[0], booked_seats.rows, model_id.rows[0]];
    }

}

module.exports = Booking;
