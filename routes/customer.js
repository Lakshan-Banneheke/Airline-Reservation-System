const ifGuest = require('../middleware/ifGuest');
const ifRegisteredCustomer = require('../middleware/ifRegisteredCustomer');
const CustomerController = require('../controllers/customerController');
const router = require('./root');

router.post('/register', ifGuest, CustomerController.register);
router.post('/login', ifGuest, CustomerController.login);
router.get('/logout', ifRegisteredCustomer, CustomerController.logout);

module.exports = router;
