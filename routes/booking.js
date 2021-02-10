const router = require('express').Router();
const BookingController = require('../controllers/bookingController');

router.post('/createBooking', BookingController.createBooking);
router.get('/', BookingController.getBooking);


module.exports = router;