const pool = require('../config/db');

class Flight {
    static async getOngoingFlightDetails(today_date){

        const query = 'SELECT schedule_id,aircraft_id,departure_time_utc,arrival_time_utc,duration,origin,destination,(select public.get_flight_state(arrival_time_utc))as flight_state FROM flight_schedule LEFT OUTER JOIN route USING(route_id) WHERE (actual_arrival is NULL and arrival_date=$1) ORDER BY arrival_time_utc ASC';
        const result = await pool.query(query, [today_date]);
        
        return result.rows;
    }

    static async getUpcomingFlightDetails(today_date){
        const query = 'SELECT schedule_id,aircraft_id,departure_date,departure_time_utc,arrival_date,arrival_time_utc,duration,origin,destination FROM flight_schedule LEFT OUTER JOIN route USING(route_id) WHERE (actual_arrival is NULL and arrival_date>$1) ORDER BY arrival_date ASC';
        const result = await pool.query(query, [today_date]);
        
        return result.rows;
    }
}

module.exports = Flight;