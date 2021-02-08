const router = require('express').Router();
const BookingController = require('../controllers/bookingController');

router.post('/create-booking', BookingController.createBooking);
router.get('/', BookingController.getBooking);


module.exports = router;