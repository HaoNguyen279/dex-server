const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StudyStreak = new Schema({
    days : String,
    lastStudyDate : String,
    
    
})
const Item = new Schema({
    laptopid: String,
    amount : Number
})
const Review = new Schema({
    laptopid: String,
    rating: {type: Number, min: 1, max: 5},
    comment: String
})
const User = new Schema({
    email: {type : String, required : true, minlength : 1, maxlength : 64, trim : true},
    password : {type : String, required : true, minlength : 6, maxlength : 64, trim : true},
    displayName : {type: String, required : true, minlength : 4, maxlength : 32, trim : true},
    membership : String,
    cart : [Item],
    reviews: [Review],
    sessionStreak : {type: Number, default: 0}

}, {timestamps: true})


module.exports = mongoose.model('User', User);