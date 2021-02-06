const router = require('express').Router();
const ifGeneralStaff = require('../middleware/ifGeneralStaff');
const GeneralStaffController = require('../controllers/generalStaffController');

router.get('/', ifGeneralStaff, GeneralStaffController.homePage);
router.get('/upcomingFlights', ifGeneralStaff, GeneralStaffController.upcomingFlights);

module.exports = router;
