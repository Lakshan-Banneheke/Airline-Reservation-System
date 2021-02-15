const router = require('express').Router();
const ifGuestOrRegisteredCustomer = require('../middleware/ifGuestOrRegisteredCustomer');
const ifStaffRedirectToStaffHome = require('../middleware/ifStaffRedirectToStaffHome');
const RootController = require('../controllers/rootController');

router.get('/', ifStaffRedirectToStaffHome, ifGuestOrRegisteredCustomer, RootController.root);

module.exports = router;
