"use strict";
const express       = require('express');

var router  = express.Router();

router.get('/', function GET(req, res) {
    res.status(200).json({ data: { }, message: 'GET /user' });
});

module.exports = router;
