const router = require('express').Router();
const BookingController = require('../controllers/bookingController');
const TicketController = require('../controllers/TicketController');

router.post('/createBooking', BookingController.createBooking);
router.post('/payment/cancel', BookingController.cancelPayment);
router.post('/payment/success', BookingController.paymentSuccess);
router.get('/payment', BookingController.getPayment);
router.post('/', BookingController.getBooking);
router.get('/', BookingController.getBooking);
router.delete('/deleteBooking', BookingController.deleteBooking);
router.post('/payment/success/eTicket', TicketController.printTicket);

module.exports = router;