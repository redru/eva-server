"use strict";
const router        = require('express').Router();

const MongoServices     = require('../../services/mongo-services');
const AuthService       = require('../../services/auth-service');

const AUTH = {
    INVALID_AUTHENTICATION: {
        code: 0,
        message: 'Authentication failed'
    },
    USER_ALREADY_EXISTS: {
        code: 1,
        message: 'User already exists'
    },
    INVALID_REQUEST: {
        code: 2,
        message: 'Invalid post auth data'
    }
};

// POST ----------------------------------------------------------------------------------------------------------------
router.post('/authorize', (req, res) => {
    const authData = req.body.data;
    var userFound = null;

    if (!authData) {
        return res.status(400).json(AUTH.INVALID_REQUEST);
    }

    MongoServices.userExists(authData).then((data) => {
        if (data) {
            userFound = data;
            return AuthService.isValidPassword(authData.password, data.password);
        } else {
            console.log('User\'', authData.username, '\'was not found on database.');
            return Promise.reject();
        }
    }).then(() => {
        return res.status(200).json({ token: 'OK' });
    }).catch(() => {
        return res.status(403).json(AUTH.INVALID_AUTHENTICATION);
    });
});

router.post('/register', (req, res) => {
    const registerData = req.body.data;

    if (!registerData) {
        return res.status(400).json(AUTH.INVALID_REQUEST);
    }

    MongoServices.userExists(registerData).then((data) => {
        if (data) {
            console.log('User\'', registerData.username, '\' already exists.');
            return res.status(409).json(AUTH.USER_ALREADY_EXISTS);
        } else {
            return AuthService.hashPassword(registerData.password);
        }
    }).then((hashedPassword) => {
        registerData.password = hashedPassword;
        return MongoServices.registerUser(registerData);
    }).then((data) => {
        console.log('Registered user:', data.username);
        return res.status(204).json();
    }).catch(() => {
        return res.status(401).json(AUTH.INVALID_AUTHENTICATION);
    });
});

module.exports = router;
