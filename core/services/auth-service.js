'use strict';
const bcrypt        = require('bcryptjs');

// AUTH SERVICES -------------------------------------------------------------------------------------------------------
const AuthService = function() { };

AuthService.prototype.isValidPassword = function(password, crypt) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, crypt, function(err, matches) {
            if (err)
                console.log(err);

            return matches ? resolve() : reject();
        });
    });
};

module.exports = new AuthService();
