const router = require('express').Router();
const RootController = require('../controllers/rootController');
const ifNotLoggedIn = require('../middleware/ifNotLoggedIn');

router.get('/',RootController.root);

module.exports = router;