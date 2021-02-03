const router = require('express').Router();
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');
const ifAdmin = require('../middleware/ifAdmin');
const ifGeneralStaff = require('../middleware/ifGeneralStaff');
const ifManager = require('../middleware/ifManager');
const ifStaff = require('../middleware/ifStaff');
const StaffController = require('../controllers/staffController');
const AdminController = require('../controllers/adminController');
const ManagerController = require('../controllers/managerController');
const GeneralStaffController = require('../controllers/generalStaffController');

router.get('/register', ifNotLoggedIn, StaffController.registerPage);
router.get('/login', ifNotLoggedIn, StaffController.loginPage);
router.get('/admin', ifAdmin, AdminController.homePage);
router.get('/manager', ifManager, ManagerController.homePage);
router.get('/general', ifGeneralStaff, GeneralStaffController.homePage);
router.get('/logout', ifStaff, StaffController.logout);

router.post('/register', ifNotLoggedIn, StaffController.register);
router.post('/login', ifNotLoggedIn, StaffController.login);

module.exports = router;
