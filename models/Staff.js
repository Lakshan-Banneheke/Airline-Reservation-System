const pool = require('../config/db');

class Staff {
    static async getStaffCategoryById(id) {
        const query = 'SELECT category FROM staff WHERE emp_id=$1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async getStaffMemberById(id) {
        const query = 'SELECT * FROM staff WHERE emp_id=$1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async registerStaffMember(
        empId, category, password, firstName,
        lastName, contactNo, email, dob, gender, country, airport,
    ) {
        const query = 'CALL registerStaff($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)';
        await pool.query(query,
            [empId, category, password,
                firstName, lastName, contactNo, email, dob, gender, country, airport]);
    }

    static async isEmpIDRegistered(id) {
        const query = 'SELECT emp_id FROM staff WHERE emp_id=$1 LIMIT 1';
        const result = await pool.query(query, [id]);
        return result.rows[0] != null;
    }

    static async getAllUnverifiedStaff() {
        const query = 'SELECT emp_id,first_name,last_name,category,email,contact_no,gender,country,assigned_airport FROM staff WHERE account_state=$1 ORDER BY emp_id';
        const result = await pool.query(query, ['unverified']);
        return result.rows;
    }

    static async getAllUnverifiedGeneralStaff() {
        const query = 'SELECT emp_id,first_name,last_name,category,email,contact_no,gender,country,assigned_airport FROM staff WHERE account_state=$1 AND category=$2 ORDER BY emp_id';
        const result = await pool.query(query, ['unverified', 'general']);
        return result.rows;
    }

    static async verifyStaff(id) {
        const query = 'UPDATE staff SET account_state=$1 WHERE emp_id=$2';
        await pool.query(query, ['verified', id]);
    }

    static async deleteStaff(id) {
        const query = 'DELETE FROM staff WHERE emp_id=$1';
        await pool.query(query, [id]);
    }
}

module.exports = Staff;
