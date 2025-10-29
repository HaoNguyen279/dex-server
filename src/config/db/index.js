const mongoose = require('mongoose');

function connect(){
    mongoose.connect('mongodb://127.0.0.1:27017/nguyen_dev')
        .then(()=> console.log("Successfully connected to database"));
}

module.exports = {connect};