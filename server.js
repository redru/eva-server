'use strict';
const http          = require('http');
const https         = require('https');
const express       = require('express');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');

const ServerConf    = require('./configuration/server.json');
const DatabaseConf  = require('./configuration/mongo.json');

// MONGODB CONFIGURATION -----------------------------------------------------------------------------------------------
mongoose.Promise = global.Promise;
mongoose.connect(DatabaseConf.uri, DatabaseConf.options, function(err) {
    if (err) throw err;
    else console.log('Success connectiong to MongoDB');
});

// EXPRESS CONFIGURATION -----------------------------------------------------------------------------------------------
const app = express();
app.disable('x-powered-by');
app.use(bodyParser.json());

// MIDDLEWARE SECTION --------------------------------------------------------------------------------------------------
/**
 * Timestamp middleware
 */
app.use((req, res, next) => {
    req.requeststamp = req.method +
        ' - Time: ' + new Date().toDateString() +
        ' - Client: ' + (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress) +
        ' - RequestUrl: ' + req.originalUrl;

    console.log(req.requeststamp);
    return next();
});

// ROUTING SECTION -----------------------------------------------------------------------------------------------------
app.get('/', (req, res) => { // Keep Alive
    res.status(200).json({ data: { }, message: 'SERVER UP' });
});

app.use('/public', require('./core/api/100/public'));

// SERVER --------------------------------------------------------------------------------------------------------------
http.createServer(app).listen(ServerConf.port, ServerConf.domain, () => {
    console.log(ServerConf.name, 'started on http://' + ServerConf.domain + ':' + ServerConf.port);
});
