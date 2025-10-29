const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Session = new Schema({
    sessionId: {type: String, required:  true,  maxlength : 64},
    userId: {type: String, maxlength : 64,},
    deviceInfo : {type: String}
}, {timestamps: true});

module.exports = mongoose.model('Session', Session);