const Flight = require('../models/Flight');

class FlightService {
    static async getAllFlightsByFilter(
        departureDate, departure, destination,
    ) {
        return Flight.getAllFlightsByFilter(
            departureDate, departure, destination,
        );
    }

    static async getFlightByID(id) {
        return Flight.getFlightByID(id);
    }

    static async getAllFlights() {
        return Flight.getAllFlights();
    }

    static async getLocation() {
        return Flight.getLocation();
    }
}

module.exports = FlightService;
