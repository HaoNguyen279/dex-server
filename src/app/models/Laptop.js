const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Comment = new Schema({
    userName: { type: String, required: true, minlength: 1, maxlength: 64, trim: true },
    comment: { type: String, required: true, minlength: 1, maxlength: 256, trim: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    createdAt: { type: Date, default: Date.now }
})

const Laptop = new Schema({
    name : { type: String, required: true, minlength: 1, maxlength: 64, trim: true },
    price : { type: Number, required: true, min: 0 },
    specs : { type: String, required: true, minlength: 1, maxlength: 256, trim: true },
    image_url : { type: String, required: true, minlength: 1, maxlength: 128, trim: true },
    slug: { type: String, required: true, unique: true, minlength: 1, maxlength: 64, trim: true },
    brand: { type: String, required: true, minlength: 1, maxlength: 32, trim: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    total_ratings: { type: Number, default: 0 },
    comments: [Comment]
});

module.exports = mongoose.model('Laptop', Laptop);