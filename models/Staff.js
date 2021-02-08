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
        empId, category, password, firstName, lastName, contactNo, email, dob, gender, country,
    ) {
        const query = 'CALL registerStaff($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)';
        await pool.query(query,
            [empId, category, password,
                firstName, lastName, contactNo, email, dob, gender, country]);
    }

    static async isEmpIDRegistered(id) {
        const query = 'SELECT emp_id FROM staff WHERE emp_id=$1 LIMIT 1';
        const result = await pool.query(query, [id]);
        return result.rows[0] != null;
    }

    static async getAllUnverifiedStaff() {
        const query = 'SELECT emp_id,first_name,last_name,category,email,contact_no,gender,country FROM staff WHERE account_state=$1 ORDER BY emp_id';
        const result = await pool.query(query, ['unverified']);
        return result.rows;
    }

    static async getAllUnverifiedGeneralStaff() {
        const query = 'SELECT emp_id,first_name,last_name,category,email,contact_no,gender,country FROM staff WHERE account_state=$1 AND category=$2 ORDER BY emp_id';
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

    static async getOngoingFlightDetails(){

        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        let year = date_ob.getFullYear();

        let today_date=year + "-" + month + "-" + date;
        // prints time in HH:MM:SS format
        console.log("inside staff modal");
        console.log(today_date);

        const query = 'SELECT schedule_id,aircraft_id,departure_time_utc,arrival_time_utc,duration,origin,destination,(select public.get_flight_state(arrival_time_utc))as flight_state FROM flight_schedule LEFT OUTER JOIN route USING(route_id) WHERE (actual_arrival is NULL and arrival_date=$1) ORDER BY arrival_time_utc DESC';
        
        const result = await pool.query(query, [today_date]);
        
        console.log(result.rows);
        return result.rows;
    }
}

module.exports = Staff;
