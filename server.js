'use strict';
const http          = require('http');
const https         = require('https');
const express       = require('express');
const bodyParser    = require('body-parser');

const ServerConf    = require('./configuration/server-configuration.json');

const app = express();

app.use(bodyParser.json());

app.get('/', function keepAlive(req, res) {
    res.status(200).json({ data: { }, message: 'Server UP.' });
});

// Api routing
app.use('/api', require('./api/api-router'));

// Generic error handling
app.use(function error(err, req, res, next) {
    console.log('error handler');
    res.status(404).json();
});

http.createServer(app).listen(ServerConf.port, ServerConf.domain, () => {
    console.log('Server deployed on http://' + ServerConf.domain + ':' + ServerConf.port);
});
