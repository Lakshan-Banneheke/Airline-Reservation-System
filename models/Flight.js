/* eslint-disable camelcase */
const pool = require('../config/db');

class Flight {
    static async incomingPendingFlightDetails(staff_member_airport) {
        const query = `SELECT schedule_id,aircraft_id,departure_time_utc,arrival_time_utc,duration,origin,destination,flight_state
                        FROM flight_schedule LEFT OUTER JOIN route USING(route_id)
                        WHERE (flight_state=$1 OR flight_state=$2) AND destination=$3
                        ORDER BY get_timestamp(arrival_date,arrival_time_utc) ASC`;
        const result = await pool.query(query, ['Departed-On-Time', 'Delayed-Departure', staff_member_airport]);
        return result.rows;
    }

    static async getToBeDepartedFlights(today, staff_member_airport) {
        const query = `SELECT schedule_id,aircraft_id,departure_time_utc,arrival_time_utc,duration,origin,destination,departure_date
                        FROM flight_schedule LEFT OUTER JOIN route USING(route_id)
                        WHERE flight_state='Scheduled' AND departure_date<=$1 AND origin=$2
                        ORDER BY get_timestamp(departure_date,departure_time_utc) ASC;`;
        const result = await pool.query(query, [today, staff_member_airport]);
        return result.rows;
    }

    static async getUpcomingFlightDetails(staff_member_airport) {
        const query = `SELECT schedule_id,aircraft_id,departure_date,departure_time_utc,arrival_date,arrival_time_utc,duration,origin,destination
                        FROM flight_schedule LEFT OUTER JOIN route USING(route_id)
                        WHERE flight_state='Scheduled' AND (origin=$1 or destination=$1)
                        ORDER BY get_timestamp(departure_date,departure_time_utc) ASC`;
        const result = await pool.query(query, [staff_member_airport]);

        return result.rows;
    }

    static async markArrival(schedule_id) {
        const query = 'CALL handleflightarrival($1)';
        await pool.query(query, [schedule_id]);
    }

    static async markDeparture(schedule_id) {
        const query = 'CALL handleflightdeparture($1)';
        await pool.query(query, [schedule_id]);
    }

    static async getUpcomingFlightGeneralInfo(aircraft_id) {
        const query = `SELECT model_name,variant,economy_seat_capacity,business_seat_capacity,platinum_seat_capacity
                        FROM aircraft_model
                        WHERE model_id=(SELECT model_id FROM aircraft_instance WHERE aircraft_id=$1)`;
        const result = await pool.query(query, [aircraft_id]);
        return result.rows[0];
    }
}

module.exports = Flight;
