"use strict";
const express       = require('express');
const bcrypt        = require('bcryptjs');

const AuthUser      = require('../../models/AuthUser');

var router  = express.Router();

router.get('/token/verify', (req, res) => {
    return res.status(200).json({ data: { }, message: 'GET /token/verify' });
});

router.post('/create', (req, res) => {
    const authData = req.body.data;

    return new Promise(function(resolve, reject) {
        AuthUser.where({ username: authData.username })
            .findOne()
            .exec(function(err, data) {
                if (err) {
                    console.log('Rejected with error:', err);
                    reject(err);
                } else if (data) {
                    console.log('User already exists.');
                    reject('User already exists.');
                } else {
                    resolve();
                }
            });
    }).then(function() {
        return new Promise((resolve, reject) => {
            bcrypt.hash(authData.password, 12, function(err, hash) {
                if (err) {
                    console.log('Rejected with error:', err);
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
    }).then((data) => {
        new AuthUser({
            username: authData.username,
            password: data,
            dateCreate: new Date()
        }).save((err, data) => {
            if (err) {
                console.log(err);
                return res.status(501).send('Internal server error');
            } else {
                return res.status(200).send(data);
            }
        });
    }, (reason) => {
        console.log(reason);
        return res.status(501).send('Internal server error');
    });

});

router.post('/authorize', (req, res) => {
    const authData = req.body.data;

    return new Promise((resolve, reject) => {
        AuthUser.where({ username: authData.username })
            .findOne()
            .exec((err, data) => {
                return err ? reject(err) : resolve(data);
            });
    }).then((data) => {
        bcrypt.compare(authData.password, data, (err, match) => {
            if (err) {
                console.log(err);
                return res.status(501).send('Internal server error');
            } else {
                if (match) {
                    return res.status(200).send('OK');
                } else {
                    return res.status(401).send('Unauthorized');
                }
            }
        });
    });

});

module.exports = router;
