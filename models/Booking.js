const pool = require('../config/db');

class Booking {
    static async getSeats(schedule_id) {
        const query_1 = 'SELECT economy_seat_capacity, business_seat_capacity, platinum_seat_capacity FROM aircraft_model NATURAL JOIN aircraft_instance NATURAL JOIN flight_schedule WHERE schedule_id=$1';
        const capacities = await pool.query(query_1, [schedule_id]);

        const query_2 = 'SELECT seat_id FROM seat_booking NATURAL JOIN seat_reservation WHERE schedule_id=$1';
        const booked_seats = await pool.query(query_2, [schedule_id]);

        const query_3 = 'SELECT model_id FROM aircraft_instance NATURAL JOIN flight_schedule WHERE schedule_id=$1';
        const model_id = await pool.query(query_3, [schedule_id]);

        console.log(capacities.rows[0]);
        console.log(booked_seats.rows);
        console.log(model_id.rows[0]);

        return [capacities.rows[0], booked_seats.rows, model_id.rows[0]];
        // return [[], [], 1];
    }

}

module.exports = Booking;
