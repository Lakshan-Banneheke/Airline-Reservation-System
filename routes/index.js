const express = require('express');

const router = express.Router();


router.use('/', require('./root'));


module.exports = router;