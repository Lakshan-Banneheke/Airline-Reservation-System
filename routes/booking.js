const router = require('express').Router();
const BookingController = require('../controllers/bookingController');

router.get('/:schedule_id', BookingController.getBooking);


module.exports = router;