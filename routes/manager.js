const router = require('express').Router();
const ifManager = require('../middleware/ifManager');
const ManagerController = require('../controllers/managerController');

router.get('/', ifManager, ManagerController.homePage);
router.get('/all_flights', ifManager, ManagerController.allFlightsPage);
router.get('/all_general_staff', ifManager, ManagerController.allGeneralStaffPage);
router.get('/reports', ifManager, ManagerController.reportPage);
router.get('/find', ifManager, ManagerController.searchGeneralStaff);
router.get('/get_airport_codes', ifManager, ManagerController.getAirportCodesJson);


router.post('/change_airport/:empId', ifManager, ManagerController.changeAssignedAirportOfStaff);
router.post('/passenger_count_to_dest', ifManager, ManagerController.getPassengerCountToDest);
router.post('/booking_count', ifManager, ManagerController.getBookingCountByPassengerType);
router.post('/next_flight_passenger_details', ifManager, ManagerController.getPassengerDetailsPage);

module.exports = router;
