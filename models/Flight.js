/* eslint-disable camelcase */
const pool = require('../config/db');

class Flight {
    static async getOngoingFlightDetails() {
        const query = `SELECT schedule_id,aircraft_id,departure_time_utc,arrival_time_utc,duration,origin,destination,get_flight_state(schedule_id) as flight_state
                        FROM flight_schedule LEFT OUTER JOIN route USING(route_id)
                        WHERE get_flight_state(schedule_id)=$1 OR get_flight_state(schedule_id)=$2
                        ORDER BY get_timestamp(arrival_date,arrival_time_utc) ASC`;
        const result = await pool.query(query, ['In-Air', 'Delayed']);
        return result.rows;
    }

    static async getUpcomingFlightDetails() {
        const query = `SELECT schedule_id,aircraft_id,departure_date,departure_time_utc,arrival_date,arrival_time_utc,duration,origin,destination
                        FROM flight_schedule LEFT OUTER JOIN route USING(route_id)
                        WHERE get_flight_state(schedule_id)='Scheduled'
                        ORDER BY get_timestamp(departure_date,departure_time_utc) ASC`;
        const result = await pool.query(query);

        return result.rows;
    }

    static async markArrival(schedule_id) {
        const query = 'CALL handleflightarrival($1)';
        await pool.query(query, [schedule_id]);
    }
}

module.exports = Flight;
