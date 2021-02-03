const router = require('express').Router();
const ifGuestOrRegisteredCustomer = require('../middleware/ifGuestOrRegisteredCustomer');
const RootController = require('../controllers/rootController');

router.get('/', ifGuestOrRegisteredCustomer, RootController.root);

module.exports = router;
