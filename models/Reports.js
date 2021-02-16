const pool = require('../config/db');

class Report{
    static async revenueFromEachModel(){
        const query = `
            SELECT SUM(price) as total_revenue,model_name,variant
            FROM Passenger_Seat INNER JOIN Aircraft_Model USING(model_id)
            GROUP BY model_name,variant;
        `;
        const result = await pool.query(query);
        return result.rows;
    }



}
module.exports = Report;