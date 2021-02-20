const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/indexController');

router.use('/', require('./root'));
router.use('/customer', require('./customer'));
router.use('/staff', require('./staff'));
router.use('/booking', require('./booking'));

router.get('/about', IndexController.getAbout);
router.get('/contact', IndexController.getContact);
router.get('/aircraftDetails', IndexController.getAircraftDetails);

router.use((req, res) => res.status(404).render('404'));

module.exports = router;
