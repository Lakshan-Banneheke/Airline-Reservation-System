/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Errors = require('../helpers/error');
const Staff = require('../models/Staff');
const Flight = require('../models/Flight');
const Airport = require('../models/Airport');
const { ymd } = require('../helpers/dateFormat');

class StaffService {
    static async register({
        empId, category, password, confirmPassword,
        firstName, lastName, contactNo, email, dob, gender, country, securityKey, airport,
    }) {
        if (!crypto.timingSafeEqual(Buffer.from(password), Buffer.from(confirmPassword))) {
            throw new Errors.BadRequest('Password does not match retype password');
        }

        if (category === 'admin' && securityKey !== process.env.REG_KEY) {
            throw new Errors.Unauthorized('Provided Security Key Invalid');
        }
        if (category === 'general' && airport === '') {
            throw new Errors.BadRequest('Provide the Assigned Airport');
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        return Staff.registerStaffMember(
            empId, category, hashedPassword,
            firstName, lastName, contactNo, email, dob, gender, country, airport,
        );
    }

    static async login({ empId, password }) {
        const staff = await Staff.getStaffMemberById(empId);
        if (!staff) {
            throw new Errors.BadRequest('Employee ID is not registered');
        }

        const hashedPassword = staff.password;
        const passwordCorrect = await bcrypt.compare(password, hashedPassword);
        if (!passwordCorrect) {
            throw new Errors.BadRequest('Invalid ID or Password');
        }
        if (staff.account_state === 'unverified') {
            throw new Errors.Unauthorized('Account Not Verified');
        }

        return staff;
    }

    static async getAllUnverifiedStaff() {
        return Staff.getAllUnverifiedStaff();
    }

    static async getAllUnverifiedGeneralStaff() {
        return Staff.getAllUnverifiedGeneralStaff();
    }

    static async deleteStaff(id) {
        return Staff.deleteStaff(id);
    }

    static async verifyStaff(id) {
        return Staff.verifyStaff(id);
    }

    static async getincomingPendingFlights(staff_member_airport) {
        const incomingPending = await Flight.incomingPendingFlightDetails(staff_member_airport);
        if (incomingPending && incomingPending.length > 0) {
            incomingPending.forEach((flight) => {
                flight.departure_date = ymd(new Date(flight.departure_date));
                flight.arrival_date = ymd(new Date(flight.arrival_date));
            });
        }
        return incomingPending;
    }

    static async getToBeDepartedFlights(assigned_airport) {
        // eslint-disable-next-line max-len
        const toBeDepartedFlights = await Flight.getToBeDepartedFlights(ymd(new Date()), assigned_airport);
        return toBeDepartedFlights;
    }

    static async getUpcomingFlights(staff_member_airport) {
        const upcomingFlights = await Flight.getUpcomingFlightDetails(staff_member_airport);
        if (upcomingFlights && upcomingFlights.length > 0) {
            upcomingFlights.forEach((flight) => {
                flight.departure_date = ymd(new Date(flight.departure_date));
                flight.arrival_date = ymd(new Date(flight.arrival_date));
            });
        }
        return upcomingFlights;
    }

    static async getUpcomingFlightGeneralInfo(aircraft_id) {
        const upcomingFlightMoreInfo = await Flight.getUpcomingFlightGeneralInfo(aircraft_id);
        return upcomingFlightMoreInfo;
    }

    static async markFlightArrival(schedule_id) {
        return Flight.markArrival(schedule_id);
    }

    static async markFlightDeparture(schedule_id) {
        return Flight.markDeparture(schedule_id);
    }

    static async getAllAirportCodes() {
        return Airport.getAllAirportCodes();
    }
}

module.exports = StaffService;
