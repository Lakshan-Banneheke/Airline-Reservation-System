const Errors = require('../helpers/error');
const Reports = require('../models/Reports');
const { ymd,ymdhms,hms } = require('../helpers/dateFormat');

class ReportService {
    
    static async getRevenueForEachModel() {
        return Reports.revenueFromEachModel();
    }
    static async getNumberOfPassengersTravellingToGivenDest({passenger_count_start_date,passenger_count_end_date,passenger_count_airport_code}){
        return Reports.getNumberOfPassengersTravellingToGivenDest(passenger_count_start_date,passenger_count_end_date,passenger_count_airport_code);
    }
    static async numberOfBookingsByEachPassengerType({booking_count_start_date,booking_count_end_date}){
        return Reports.numberOfBookingsByEachPassengerType(booking_count_start_date,booking_count_end_date);
    }
    static async getPassengerDetailsOnNextFlightOnGivenRoute(routeId){
        return Reports.getPassengerDetailsOnNextFlightOnGivenRoute(routeId);
    }
    static async getPastFlightDetailsReport(origin,dest){
        const flights = await  Reports.getPastFlightDetailReport(origin,dest)
        if (flights && flights.length > 0) {
            flights.forEach((flight) => {
                flight.departure_date = ymd(new Date(flight.departure_date));
                flight.arrival_date = ymd(new Date(flight.arrival_date));
            });
        }
        return flights;
        
    }
}

module.exports = ReportService;
