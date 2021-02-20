/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Errors = require('../helpers/error');
const Staff = require('../models/Staff');
const Flight = require('../models/Staff_Flight');
const Airport = require('../models/Airport');
const { ymd, hms } = require('../helpers/dateFormat');

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

    static async deleteOwnAccount(empId, password) {
        const staff = await Staff.getStaffMemberById(empId);
        if (!staff) {
            throw new Errors.BadRequest('OOPS could not delete account');
        }
        const hashedPassword = staff.password;
        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordCorrect) {
            throw new Errors.BadRequest('Password is not correct');
        }
        return Staff.deleteStaff(empId);
    }

    static async verifyStaff(id) {
        return Staff.verifyStaff(id);
    }

    static async getAllArrivedFlights() {
        const allArrivedFlights = await Flight.getAllArrivedFlights();
        if (allArrivedFlights && allArrivedFlights.length > 0) {
            allArrivedFlights.forEach((flight) => {
                flight.departure_date = ymd(new Date(flight.departure_date));
                flight.arrival_date = ymd(new Date(flight.arrival_date));
                flight.actual_arrival = `${ymd(new Date(flight.actual_arrival))}  ${hms(new Date(flight.actual_arrival))}`;
            });
        }
        // console.log(allArrivedFlights);
        return allArrivedFlights;
    }

    static async getAllOngoingFlights() {
        // const ongoingAllFlights = await Flight.ongoingAllFlights();
        const ongoingAllFlights = await Flight.getAllOngoingFlights();
        if (ongoingAllFlights && ongoingAllFlights.length > 0) {
            ongoingAllFlights.forEach((flight) => {
                flight.departure_date = ymd(new Date(flight.departure_date));
                flight.arrival_date = ymd(new Date(flight.arrival_date));
            });
        }
        // console.log(ongoingAllFlights);
        return ongoingAllFlights;
    }

    static async getAllUpcomingFlights() {
        const upcomingFlights = await Flight.getAllUpcomingFlights();
        if (upcomingFlights && upcomingFlights.length > 0) {
            upcomingFlights.forEach((flight) => {
                flight.departure_date = ymd(new Date(flight.departure_date));
                flight.arrival_date = ymd(new Date(flight.arrival_date));
            });
        }
        // console.log(upcomingFlights);
        return upcomingFlights;
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
        const toBeDepartedFlights = await Flight.getToBeDepartedFlights(assigned_airport);
        if (toBeDepartedFlights && toBeDepartedFlights.length > 0) {
            toBeDepartedFlights.forEach((flight) => {
                flight.departure_date = ymd(new Date(flight.departure_date));
                if (flight.departure_date < ymd(new Date())) {
                    flight.state = 'Delayed';
                }
            });
        }
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

    static async editProfileInfo(empId, {
        firstName, lastName, email, contactNo, country,
    }) {
        const isEmailRegistered = await Staff.isEmailRegistered(email);
        const staff = await Staff.getStaffMemberById(empId);
        if (email !== staff.email && isEmailRegistered) {
            throw new Errors.BadRequest('Email Already in Use.');
        }
        return Staff.updateGerenalInfo(empId, firstName, lastName, email, contactNo, country);
    }

    static async changePassword(empId, { old_pwd, new_pwd }) {
        const staff = await Staff.getStaffMemberById(empId);
        const hashedPassword = staff.password;
        const isPasswordCorrect = await bcrypt.compare(old_pwd, hashedPassword);
        if (!isPasswordCorrect) {
            throw new Errors.BadRequest('Current Password is not correct');
        }
        const newhashedPassword = await bcrypt.hash(new_pwd, 10);
        return Staff.updatePassword(empId, newhashedPassword);
    }

    static async getAllVerifiedGeneralStaff() {
        return Staff.getAllVerifiedGeneralStaff();
    }

    static async getGeneralStaffWhereNameLike(text) {
        return Staff.getGeneralStaffWhereNameLike(text);
    }

    static async changeAssignedAirport(empId, newAirportCode) {
        return Staff.changeAssignedAirport(empId, newAirportCode);
    }
    static async getAllRoutes(){
        return Flight.getAllRoutes()
    }
}

module.exports = StaffService;
