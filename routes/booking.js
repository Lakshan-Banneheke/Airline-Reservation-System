const router = require('express').Router();
const BookingController = require('../controllers/bookingController');

router.post('/createBooking', BookingController.createBooking);
router.post('/payment/cancel', BookingController.cancelPayment);
router.post('/payment/success', BookingController.paymentSuccess);
router.get('/payment', BookingController.getPayment);
router.post('/', BookingController.getBooking);
router.get('/', BookingController.getBooking);
router.delete('/deleteBooking', BookingController.deleteBooking);

module.exports = router;