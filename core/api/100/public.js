"use strict";
const router        = require('express').Router();

const MongoServices     = require('../../services/mongo-services');
const AuthService       = require('../../services/auth-service');

const AUTH = {
    INVALID_AUTHENTICATION: {
        code: 0,
        message: 'Authentication failed'
    }
};

// POST ----------------------------------------------------------------------------------------------------------------
router.post('/authorize', (req, res) => {
    const authData = req.body.data;
    var userFound = null;

    MongoServices.userExists(authData).
    then((data) => {
        if (data) {
            userFound = data;
            return AuthService.isValidPassword(authData.password, data.password);
        } else {
            console.log('User\'', authData.username, '\'was not found on database.');
            return Promise.reject();
        }
    }).
    then(() => {
        return res.status(200).json({ token: 'OK' });
    }).
    catch(() => {
        return res.status(401).json(AUTH.INVALID_AUTHENTICATION);
    });
});

module.exports = router;
