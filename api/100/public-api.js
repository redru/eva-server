"use strict";
const express       = require('express');

const AuthUser      = require('../../models/AuthUser');

var router  = express.Router();

router.get('/verify', function GET(req, res) {
    res.status(200).json({ data: { }, message: 'GET /verify' });
});

router.post('/authorize', function POST(req, res) {
    res.status(200).json({ data: { }, message: 'POST /authorize' });
});

module.exports = router;
