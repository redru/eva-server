'use strict';
const bcrypt        = require('bcryptjs');

// AUTH SERVICES -------------------------------------------------------------------------------------------------------
const AuthService = function() { };

AuthService.prototype.isValidPassword = function(password, crypt) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, crypt, function(err, matches) {
            if (err) {
                console.log(err);
                return reject(err);
            }

            return matches ? resolve(matches) : reject(matches);
        });
    });
};

AuthService.prototype.hashPassword = function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 14, function(err, hash) {
            if (err) {
                console.log(err);
                return reject(err);
            } else {
                return resolve(hash);
            }
        });
    });
};

module.exports = new AuthService();
