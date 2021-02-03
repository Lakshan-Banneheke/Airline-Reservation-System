const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Errors = require('../helpers/error');
const Staff = require('../models/Staff');

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
}

module.exports = StaffService;
