const router = require('express').Router();
const ifManager = require('../middleware/ifManager');
const ManagerController = require('../controllers/managerController');

router.get('/', ifManager, ManagerController.homePage);
router.get('/all_general_staff', ifManager, ManagerController.allGeneralStaffPage);
router.get('/find', ifManager, ManagerController.searchGeneralStaff);

module.exports = router;
