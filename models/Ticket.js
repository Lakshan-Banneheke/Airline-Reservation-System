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
        const query1 = 'SELECT  booking_id,date_of_booking,passenger_seat.seat_id as seat_id,passenger_seat.model_id as model_id,price,name,customer_id,schedule_id,final_price,class_name,class_id FROM passenger_seat NATURAL JOIN seat_booking,aircraft_seat,traveller_class WHERE booking_id = $1 AND passenger_seat.model_id=aircraft_seat.model_id AND passenger_seat.seat_id=aircraft_seat.seat_id AND aircraft_seat.traveller_class_id=traveller_class.class_id';
        const query2 = 'SELECT schedule_id FROM seat_booking WHERE booking_id = $1';
        let result1 = await pool.query(query1,[booking_id]);
        let result2=await pool.query(query2,[booking_id]);
        return [result2.rows[0], result1.rows];
    }    
    static async getTicketDetails(booking_id){
            //get schedule id related to the booking
            const query1=`SELECT schedule_id FROM seat_booking  WHERE booking_id=$1;`;
            let result1=await pool.query(query1,[booking_id]);
            let schedule_id=result1.rows[0].schedule_id;

            const query2 = 'SELECT aircraft_id FROM flight_schedule WHERE schedule_id = $1';
            let result2=await pool.query(query2,[schedule_id]);
            let aircraft_id=result2.rows[0].aircraft_id;

            //get model details related to the booking
            const query3='SELECT aircraft_model.model_id,model_name,variant FROM aircraft_model,aircraft_instance WHERE aircraft_id=$1 AND aircraft_instance.model_id=aircraft_model.model_id;';
            let result3=await pool.query(query3,[aircraft_id]);

            //get organizational info
            const query4='SELECT airline_name,airline_hotline,airline_email,address_1,address_2,address_3 FROM organizational_info;'
            let result4=await pool.query(query4,[]);

            return [result1.rows[0],result3.rows[0],result4.rows[0]];
    }
    static async getDiscount(booking_id){
        const query = 'SELECT price_before_discount, final_price FROM seat_booking WHERE booking_id = $1';
        let price = await pool.query(query,[booking_id]);
        const priceBeforeDiscount=price.rows[0].price_before_discount;
        const finalPrice=price.rows[0].final_price;
        return (finalPrice-priceBeforeDiscount)/priceBeforeDiscount;
    }
}
module.exports = Ticket;