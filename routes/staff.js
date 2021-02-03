const router = require('express').Router();
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');
const StaffController = require('../controllers/staffController');

router.get('/register', ifNotLoggedIn, StaffController.registerPage);

router.post('/register', ifNotLoggedIn, StaffController.register);
router.post('/login', ifNotLoggedIn, StaffController.login);

module.exports = router;
