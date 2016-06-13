'use strict';
const mongoose       = require('mongoose');
const Schema         = mongoose.Schema;

var schema = new Schema({
    username: String,
    password: String,
    service: String,
    serviceData: Schema.Types.Mixed,
    userCreate: { type: Schema.Types.ObjectId, ref: 'AuthUser' },
    dateCreate: Date,
    userUpdate: { type: Schema.Types.ObjectId, ref: 'AuthUser' },
    dateUpdate: Date
});

module.exports = mongoose.model('AuthUser', schema);
