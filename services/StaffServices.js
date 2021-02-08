const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Errors = require('../helpers/error');
const Staff = require('../models/Staff');
const Flight = require('../models/Flight');
class StaffService {
    static async register({
        empId, category, password, confirmPassword,
        firstName, lastName, contactNo, email, dob, gender, country, securityKey,
    }) {
        if (!crypto.timingSafeEqual(Buffer.from(password), Buffer.from(confirmPassword))) {
            throw new Errors.BadRequest('Password does not match retype password');
        }

        if (category === 'admin' && securityKey !== process.env.REG_KEY) {
            throw new Errors.Unauthorized('Provided Security Key Invalid');
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        return Staff.registerStaffMember(
            empId, category, hashedPassword,
            firstName, lastName, contactNo, email, dob, gender, country,
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

    static async getOngoingFlights(){
        let date_ob = new Date();
        //current date
        let date = ("0" + date_ob.getDate()).slice(-2);
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        let year = date_ob.getFullYear();
        let today=year + "-" + month + "-" + date;
        
        const ongoingFlights = await Flight.getOngoingFlightDetails(today);
        
        return ongoingFlights;
    }

    static async getUpcomingFlights(){
        let date_ob = new Date();
        //current date
        let date = ("0" + date_ob.getDate()).slice(-2);
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        let year = date_ob.getFullYear();
        let today=year + "-" + month + "-" + date;
        
        const upcomingFlights = await Flight.getUpcomingFlightDetails(today);
       
        return upcomingFlights;
    }

    static async markFlightArrival(schedule_id){
        let date_ob = new Date();
        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        let year = date_ob.getFullYear();
        // current hours
        let hours = ("0" + (date_ob.getHours() + 1)).slice(-2);
        // current minutes
        let minutes = ("0" + (date_ob.getMinutes() + 1)).slice(-2);
        // current seconds
        let seconds =("0" + (date_ob.getSeconds() + 1)).slice(-2);
        let today_date=year + "-" + month + "-" + date;
        let now_time=hours+":"+minutes+":"+seconds;

        return Flight.markArrival(schedule_id,today_date,now_time);
    }

}

module.exports = StaffService;
