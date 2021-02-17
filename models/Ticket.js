const pool = require('../config/db');

class Ticket {

    static async getFlightInfo(schedule_id) {
        const query1 = 'SELECT route_id, departure_date, departure_time_utc, arrival_date, arrival_time_utc, origin, destination, duration FROM flight_schedule NATURAL JOIN route WHERE schedule_id=$1';
        const flightInfo = await pool.query(query1, [schedule_id]);
        let route_id = flightInfo.rows[0].route_id;
        const query2 = 'SELECT traveler_class_id, price FROM seat_price WHERE route_id=$1';
        const priceInfo = await pool.query(query2, [route_id]);

        return [flightInfo.rows[0], priceInfo.rows];
    }
    static async getBookingDetails(booking_id){
        const query1 = 'SELECT  booking_id,passenger_seat.seat_id as seat_id,passenger_seat.model_id as model_id,price,name,customer_id,schedule_id,total_price,class_name,class_id FROM passenger_seat NATURAL JOIN seat_booking,aircraft_seat,traveller_class WHERE booking_id = $1 AND passenger_seat.model_id=aircraft_seat.model_id AND passenger_seat.seat_id=aircraft_seat.seat_id AND aircraft_seat.traveller_class_id=traveller_class.class_id';
        const query2 = 'SELECT schedule_id FROM seat_booking WHERE booking_id = $1';
        let result1 = await pool.query(query1,[booking_id]);
        let result2=await pool.query(query2,[booking_id]);
        return [result2.rows[0], result1.rows];
    }    
    static async getTicketDetails(booking_id){
        //get customer details related to the booking
        let type=`SELECT customer.type as type FROM seat_booking NATURAL JOIN customer WHERE booking_id=$1;`;
        let result_type=await pool.query(type,[booking_id]);
        let typeName=result_type.rows[0].type;

        if(typeName==='registered'){
            const query1=`SELECT customer.customer_id,customer.type as type,schedule_id,first_name,last_name,category,contact_no FROM seat_booking NATURAL JOIN customer INNER JOIN registered_customer ON(type='registered' AND seat_booking.customer_id=registered_customer.customer_id) WHERE booking_id=$1;`;
            let result1=await pool.query(query1,[booking_id]);
            let schedule_id=result1.rows[0].schedule_id;

            const query2 = 'SELECT aircraft_id FROM flight_schedule WHERE schedule_id = $1';
            let result2=await pool.query(query2,[schedule_id]);
            let aircraft_id=result2.rows[0].aircraft_id;

            //get model details related to the booking
            const query3='SELECT aircraft_model.model_id,model_name,variant FROM aircraft_model,aircraft_instance WHERE aircraft_id=$1 AND aircraft_instance.model_id=aircraft_model.model_id;';
            let result3=await pool.query(query3,[aircraft_id]);

            //get organizational info
            const query4='SELECT airline_name,airline_hotline,airline_email,airline_address FROM organizational_info;'
            let result4=await pool.query(query4,[]);

            return [result1.rows[0],result3.rows[0],result4.rows[0]];
        }
        else{
            const query1=`SELECT customer.customer_id,customer.type as type,schedule_id,name,mobile FROM seat_booking NATURAL JOIN customer INNER JOIN guest_customer ON(type='guest' AND seat_booking.customer_id=guest_customer.customer_id) WHERE booking_id=$1;`;
            let result1=await pool.query(query1,[booking_id]);
            let schedule_id=result1.rows[0].schedule_id;

            const query2 = 'SELECT aircraft_id FROM flight_schedule WHERE schedule_id = $1';
            let result2=await pool.query(query2,[schedule_id]);
            let aircraft_id=result2.rows[0].aircraft_id;

            //get model details related to the booking
            const query3='SELECT aircraft_model.model_id,model_name,variant FROM aircraft_model,aircraft_instance WHERE aircraft_id=$1 AND aircraft_instance.model_id=aircraft_model.model_id;';
            let result3=await pool.query(query3,[aircraft_id]);

            //get organizational info
            const query4='SELECT airline_name,airline_hotline,airline_email,airline_address FROM organizational_info;'
            let result4=await pool.query(query4,[]);

            return [result1.rows[0],result3.rows[0],result4.rows[0]];
        }
        
    }
}
module.exports = Ticket;