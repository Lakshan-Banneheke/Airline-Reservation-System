const pool = require('../config/db');

class Flight {
    static async getFlightByID(id) {
        const query = `SELECT schedule_id,flight_schedule.route_id,departure_time_utc,departure_time_utc-interval  '00:45 hour' AS boarding_time_utc, arrival_time_utc,departure_date,arrival_date,origin,destination FROM flight_schedule  INNER JOIN route ON flight_schedule.route_id=route.route_id WHERE schedule_id=$1; `;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async getAllFlightsByFilter(vdepartureDate, vdeparture, vdestination) {
        let result = null;
        // View all the flights available
        // eslint-disable-next-line max-len
        if ((vdepartureDate === undefined || vdepartureDate === '') && (vdeparture === undefined || vdeparture === '') && (vdestination === undefined || vdeparture === '')) {
            const query = `SELECT schedule_id,route_id,departure_date,departure_time_utc,arrival_date,arrival_time_utc,origin,destination FROM flight_schedule INNER JOIN route USING(route_id)  WHERE flight_state='Scheduled' ORDER BY departure_date LIMIT 20;`;
            result = await pool.query(query, []);
            return result.rows;
        } // Filter flights by From
        if (vdestination === '' && vdepartureDate === '') {
            const query = `SELECT schedule_id,route_id,departure_date,arrival_date,departure_time_utc,arrival_time_utc,origin,destination FROM flight_schedule  INNER JOIN route USING(route_id) WHERE origin=$1 AND flight_state='Scheduled' ORDER BY departure_date;`;
            result = await pool.query(query, [vdeparture]);
            return result.rows;
        } // Filter flights by Date of departure
        if (vdeparture === '' && vdestination === '') {
            const query = `SELECT schedule_id,route_id,departure_date,arrival_date,departure_time_utc,arrival_time_utc,origin,destination FROM flight_schedule  INNER JOIN route USING(route_id) WHERE departure_date=$1 AND flight_state='Scheduled' ORDER BY departure_date; `;
            result = await pool.query(query, [vdepartureDate]);
            return result.rows;
        } // Filter flights by To
        if (vdeparture === '' && vdepartureDate === '') {
            const query = `SELECT schedule_id,route_id,departure_date,arrival_date,departure_time_utc,arrival_time_utc,origin,destination FROM flight_schedule  INNER JOIN route USING(route_id) WHERE destination=$1 AND flight_state='Scheduled' ORDER BY departure_date;`;
            result = await pool.query(query, [vdestination]);
            return result.rows;
        } // Filter flights by Departure date and origin
        if (vdestination === '') {
            const query = `SELECT schedule_id,route_id,departure_date,arrival_date,departure_time_utc,arrival_time_utc,origin,destination FROM flight_schedule  INNER JOIN route USING(route_id) WHERE departure_date=$1 AND origin=$2  AND flight_state='Scheduled' ORDER BY departure_time_utc;`;
            result = await pool.query(query, [vdepartureDate, vdeparture]);
            return result.rows;
        } // Filter flights by To and From
        if (vdepartureDate === '') {
            const query = `SELECT schedule_id,route_id,departure_date,arrival_date,departure_time_utc,arrival_time_utc,origin,destination FROM flight_schedule  INNER JOIN route USING(route_id) WHERE origin=$1 AND destination=$2  AND flight_state='Scheduled' ORDER BY departure_date; `;
            result = await pool.query(query, [vdeparture, vdestination]);
            return result.rows;
        } // Filter flights by To, From and Departure date
        if (!(vdepartureDate === '' || vdeparture === '' || vdestination === '')) {
            const query = `SELECT schedule_id,route_id,departure_date,arrival_date,departure_time_utc,arrival_time_utc,origin,destination FROM flight_schedule  INNER JOIN route USING(route_id) WHERE origin=$1 AND destination=$2 AND departure_date=$3 AND flight_state='Scheduled' ORDER BY departure_time_utc; `;
            result = await pool.query(query, [vdeparture, vdestination, vdepartureDate]);
            return result.rows;
        }
        return result.rows;
    }

    static async getAllFlights() {
        const query = `SELECT schedule_id,route_id,departure_date,departure_time_utc,arrival_date,arrival_time_utc,origin,destination,price,destination_image FROM flight_schedule INNER JOIN route USING(route_id) INNER JOIN seat_price USING(route_id) INNER JOIN airport ON airport.airport_code=route.destination WHERE flight_state='Scheduled' AND traveler_class_id=3  ORDER BY departure_date LIMIT 6;`;
        const result = await pool.query(query, []);
        return result.rows;
    }

    static async getLocation() {
        const query = 'SELECT airport_code,name FROM temp_airport;';
        const result = await pool.query(query, []);
        return result.rows;
    }


    static async getAircraftDetails(){
        const query = 'SELECT * FROM aircraft_model;';
        const result = await pool.query(query, []);
        return result.rows;
    }

}
module.exports = Flight;
