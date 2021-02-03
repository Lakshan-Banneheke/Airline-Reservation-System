const pool = require('../config/db');

class Staff {
    static async getStaffCategoryById(id) {
        const query = 'SELECT category FROM staff WHERE emp_id=$1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async getStaffMemberById(id) {
        const query = 'SELECT * FROM Staff WHERE emp_id=$1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async registerStaffMember(
        empId, category, password, firstName, lastName, contactNo, email, dob, gender, country,
    ) {
        const query = 'CALL registerStaff ( $1,$2,$3,$4,$5,$6,$7,$8,$9)';
        await pool.query(query,
            [empId, category, password,
                firstName, lastName, contactNo, email, dob, gender, country]);
    }

    static async isEmpIDRegistered(id) {
        const query = 'SELECT emp_id FROM staff WHERE emp_id=$1 LIMIT 1';
        const result = await pool.query(query, [id]);
        return result.rows[0] != null;
    }
}

module.exports = Staff;
