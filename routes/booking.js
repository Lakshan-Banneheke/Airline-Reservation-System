const router = require('express').Router();
const BookingController = require('../controllers/bookingController');

router.post('/createBooking', BookingController.createBooking);
router.post('/payment/cancel', BookingController.cancelPayment);
router.post('/payment/success', BookingController.paymentSuccess);
router.get('/payment', BookingController.getPayment);
router.post('/', BookingController.getBooking);
router.get('/', checkForScheduleID, BookingController.getBooking);
router.delete('/deleteBooking', BookingController.deleteBooking);

function checkForScheduleID(req, res, next) {
    if (typeof req.body.schedule_id !== 'undefined') {
        next();
    } else if (typeof req.query.schedule_id !== 'undefined'){
        next();
    } else {
        res.status(405).render('405');
    }
}

module.exports = router;