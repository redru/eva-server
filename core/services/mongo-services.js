'use strict';
const mongoose       = require('mongoose');
const Schema         = mongoose.Schema;

// MONGODB SCHEMAS -----------------------------------------------------------------------------------------------------
const schema = new Schema({
    username: String,
    password: String,
    service: String,
    serviceData: Schema.Types.Mixed,
    userCreate: { type: Schema.Types.ObjectId, ref: 'AuthUser' },
    dateCreate: Date,
    userUpdate: { type: Schema.Types.ObjectId, ref: 'AuthUser' },
    dateUpdate: Date
});

const AuthUser = mongoose.model('AuthUser', schema);

// MONGODB SERVICES ----------------------------------------------------------------------------------------------------
const MongoServices = function() { };

MongoServices.prototype.userExists = function(auth) {
    return AuthUser.findOne({ username: auth.username }).select('username password service serviceData')
        .then((doc) => {
            return doc;
        }, (err) => {
            console.log(err);
            return err;
        });
};

module.exports = new MongoServices();
