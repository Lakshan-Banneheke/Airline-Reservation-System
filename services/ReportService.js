const Errors = require('../helpers/error');
const Reports = require('../models/Reports');

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
}

module.exports = ReportService;
