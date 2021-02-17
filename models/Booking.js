const pool = require('../config/db');

class Booking {
    static async getSeats(schedule_id) {
        const query_1 = 'SELECT economy_seat_capacity, business_seat_capacity, platinum_seat_capacity, economy_seats_per_row, business_seats_per_row, platinum_seats_per_row FROM aircraft_model NATURAL JOIN aircraft_instance NATURAL JOIN flight_schedule WHERE schedule_id=$1';
        const capacities = await pool.query(query_1, [schedule_id]);

        const query_2 = 'SELECT seat_id FROM seat_booking NATURAL JOIN passenger_seat WHERE schedule_id=$1';
        const booked_seats = await pool.query(query_2, [schedule_id]);

        const query_3 = 'SELECT model_id FROM aircraft_instance NATURAL JOIN flight_schedule WHERE schedule_id=$1';
        const model_id = await pool.query(query_3, [schedule_id]);

        return [capacities.rows[0], booked_seats.rows, model_id.rows[0]];
    }

    static async createBooking(values){
        if (values.custType !== 'registered'){
            values.custID = null;
            values.custType = 'guest';
        }
        const query = 'SELECT insertBooking($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';
        let booking_id = await pool.query(query,[values.custID, values.schedule_id, values.passName, values.passPassport, values.passDob, values.seatNo, values.custName, values.address, values.custDob, values.custGender, values.custPassport, values.mobile, values.custEmail, values.custType]);
        return booking_id.rows[0];
    }

    static async getFlightInfo(schedule_id) {
        const query1 = 'SELECT route_id, departure_date, departure_time_utc, arrival_date, arrival_time_utc, origin, destination, duration FROM flight_schedule NATURAL JOIN route WHERE schedule_id=$1';
        const flightInfo = await pool.query(query1, [schedule_id]);
        let route_id = flightInfo.rows[0].route_id;
        const query2 = 'SELECT traveler_class_id, price FROM seat_price WHERE route_id=$1';
        const priceInfo = await pool.query(query2, [route_id]);

        return [flightInfo.rows[0], priceInfo.rows];
    }

    static async getPrice(booking_id){
        const query = 'SELECT price_before_discount, final_price FROM seat_booking WHERE booking_id = $1';
        let price = await pool.query(query,[booking_id]);
        return price.rows[0];
    }

    static async getSeatPrices(booking_id){
        const query = 'SELECT seat_id, price FROM passenger_seat WHERE booking_id = $1';
        let seat_prices = await pool.query(query,[booking_id]);
        return seat_prices.rows;
    }

    static async successBooking(booking_id){
        const query = 'UPDATE seat_booking SET state = \'Paid\' WHERE booking_id = $1';
        await pool.query(query,[booking_id]);
    }

    static async cancelBooking(booking_id){
        const query = ' DELETE FROM seat_booking WHERE booking_id = $1;';
        await pool.query(query,[booking_id]);
    }

    static async getBookingDetails(booking_id){
        const query1 = 'SELECT  booking_id,passenger_seat.seat_id as seat_id,passenger_seat.model_id as model_id,price,name,customer_id,schedule_id,final_price,class_name FROM passenger_seat NATURAL JOIN seat_booking,aircraft_seat,traveller_class WHERE booking_id = $1 AND passenger_seat.model_id=aircraft_seat.model_id AND passenger_seat.seat_id=aircraft_seat.seat_id AND aircraft_seat.traveller_class_id=traveller_class.class_id';
        const query2 = 'SELECT schedule_id FROM seat_booking WHERE booking_id = $1';
        let result1 = await pool.query(query1,[booking_id]);
        let result2=await pool.query(query2,[booking_id]);
        return [result2.rows[0], result1.rows];
    }

}

module.exports = Booking;
