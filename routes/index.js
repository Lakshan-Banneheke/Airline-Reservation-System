const express = require('express');

const router = express.Router();

router.use('/', require('./root'));
router.use('/customer', require('./customer'));
router.use('/staff', require('./staff'));
router.use('/booking', require('./booking'));

router.use((req, res) => res.status(404).render('404'));

module.exports = router;
