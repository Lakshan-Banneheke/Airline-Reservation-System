const Errors = require('../helpers/error');
const Reports = require('../models/Reports');

class ReportService {
    
    static async getRevenueForEachModel() {
        return Reports.revenueFromEachModel();
    }
}

module.exports = ReportService;
