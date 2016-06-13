"use strict";
const express       = require('express');

const ActiveApi     = require('./api-active');

var router  = express.Router();

router.use(function timeLog(req, res, next) {
    console.log(req.method, '-', new Date());
    next();
});

router.get('/', function keepAlive(req, res) {
    res.status(200).json({ data: { }, message: 'API services are UP.' });
});

ActiveApi.active.forEach(function(obj) {
    router.use(obj.path, obj.callback);
    console.log('Registered API:', obj.path);
});

module.exports = router;
