const router = require('express').Router();
const ifGeneralStaff = require('../middleware/ifGeneralStaff');
const GeneralStaffController = require('../controllers/generalStaffController');

router.get('/', ifGeneralStaff, GeneralStaffController.homePage);
router.get('/upcomingFlightsMain', ifGeneralStaff, GeneralStaffController.upcomingFlightsMain);
//router.get('/upcomingFlightsMore', ifGeneralStaff, GeneralStaffController.upcomingFlightsMore);

router.post('/moreInfoUpcomingFlight', ifGeneralStaff, GeneralStaffController.upcomingFlightsMore);
router.post('/markArrivalFlight', ifGeneralStaff, GeneralStaffController.markFlightArrival);
module.exports = router;
