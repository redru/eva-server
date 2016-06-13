'use strict';
const http          = require('http');
const https         = require('https');
const express       = require('express');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');

const ServerConf    = require('./configuration/server-configuration.json');
const DatabaseConf  = require('./configuration/database-configuration.json');

const app = express();

app.use(bodyParser.json());

// Mongo connnection
mongoose.connect('mongodb://' + DatabaseConf.mongo.url + ':' + DatabaseConf.mongo.port + '/' + DatabaseConf.mongo.dbName, DatabaseConf.mongo.options, function(err) {
    if (err) throw err;
    else console.log('Connection to mongo established:', DatabaseConf.mongo.url + ':' + DatabaseConf.mongo.port + '/' + DatabaseConf.mongo.dbName);
});

// Keep Alive
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
