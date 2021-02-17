const router = require('express').Router();
const BookingController = require('../controllers/bookingController');
const ifRegisteredCustomer = require('../middleware/ifRegisteredCustomer');

router.post('/createBooking', BookingController.createBooking);
router.post('/payment/cancel', BookingController.cancelPayment);
router.post('/payment/success', BookingController.paymentSuccess);
router.get('/payment', BookingController.getPayment);
router.get('/previous-bookings', ifRegisteredCustomer, BookingController.getPreviousBookings);
router.post('/previous', ifRegisteredCustomer, BookingController.getPreviousBooking);
router.post('/', BookingController.getBooking);
router.get('/', BookingController.getBooking);
router.delete('/deleteBooking', BookingController.deleteBooking);

module.exports = router;