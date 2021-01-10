const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const CustomerController = require('../controllers/customerController');
const router = require('./root');

router.post('/register', ifNotLoggedIn, CustomerController.register);
router.post('/login', ifNotLoggedIn, CustomerController.login);
router.post('/logout', ifLoggedIn, CustomerController.logout);

module.exports = router;