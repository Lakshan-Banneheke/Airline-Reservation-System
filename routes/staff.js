const router = require('express').Router();
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');
const ifAdmin = require('../middleware/ifAdmin');
const ifGeneralStaff = require('../middleware/ifGeneralStaff');
const ifManager = require('../middleware/ifManager');
const ifStaff = require('../middleware/ifStaff');
const StaffController = require('../controllers/staffController');
const AdminController = require('../controllers/adminController');
const ManagerController = require('../controllers/managerController');

router.use('/general', ifGeneralStaff, require('./generalStaff'));

router.get('/register', ifNotLoggedIn, StaffController.registerPage);
router.get('/login', ifNotLoggedIn, StaffController.loginPage);
router.get('/admin', ifAdmin, AdminController.homePage);
router.get('/manager', ifManager, ManagerController.homePage);

router.get('/logout', ifStaff, StaffController.logout);

router.post('/register', ifNotLoggedIn, StaffController.register);
router.post('/login', ifNotLoggedIn, StaffController.login);
router.post('/admin/verify_staff', ifAdmin, AdminController.verifyStaff);
router.post('/admin/delete_staff', ifAdmin, AdminController.deleteStaff);
router.post('/manager/verify_staff', ifManager, ManagerController.verifyStaff);
router.post('/manager/delete_staff', ifManager, ManagerController.deleteStaff);

module.exports = router;
