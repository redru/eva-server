"use strict";
const express       = require('express');

var router  = express.Router();

router.use(function timeLog(req, res, next) {
    console.log(req.method, '-', new Date());
    next();
});

router.get('/', function(req, res) {
    res.status(200).json({ data: { }, message: 'API services are UP.' });
});

module.exports = router;