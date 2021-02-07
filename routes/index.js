const express = require('express');

const router = express.Router();

router.use('/', require('./root'));
router.use('/customer', require('./customer'));
router.use('/staff', require('./staff'));
router.use('/booking', function (req, res, next) {
    console.log(2); next();}, require('./booking'));

module.exports = router;
