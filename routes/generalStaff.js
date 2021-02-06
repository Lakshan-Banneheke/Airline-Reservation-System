const router = require('express').Router();
const ifGeneralStaff = require('../middleware/ifGeneralStaff');
const GeneralStaffController = require('../controllers/generalStaffController');

router.get('/', GeneralStaffController.homePage);
router.get('/upcomingFlights',GeneralStaffController.upcomingFlights);

module.exports = router;