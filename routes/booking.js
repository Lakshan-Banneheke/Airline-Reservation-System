const router = require('express').Router();
const BookingController = require('../controllers/bookingController');

router.post('/create-booking', BookingController.createBooking);
router.get('/payment/cancel', BookingController.cancelPayment);
router.get('/payment/success', BookingController.paymentSuccess);
router.get('/payment', BookingController.getPayment);
router.get('/', BookingController.getBooking);


module.exports = router;