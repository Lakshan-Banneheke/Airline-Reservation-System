const router = require('express').Router();
const ifManager = require('../middleware/ifManager');
const ManagerController = require('../controllers/managerController');

router.get('/', ifManager, ManagerController.homePage);
router.get('/all_general_staff', ifManager, ManagerController.allGeneralStaffPage);
router.get('/find', ifManager, ManagerController.searchGeneralStaff);
router.get('/get_airport_codes', ifManager, ManagerController.getAirportCodesJson);

router.post('/change_airport/:empId', ifManager, ManagerController.changeAssignedAirportOfStaff);

module.exports = router;
