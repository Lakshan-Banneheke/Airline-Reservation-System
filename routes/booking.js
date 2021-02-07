const router = require('express').Router();
const BookingController = require('../controllers/bookingController');

router.post('/create-booking', BookingController.createBooking);
router.get('/:schedule_id', function (req,res,next){
    console.log(3); next();}, BookingController.getBooking);


module.exports = router;