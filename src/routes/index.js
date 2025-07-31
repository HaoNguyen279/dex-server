const express = require('express');
const characterRouter = require("./character")



function route(app){
    app.use('/api', characterRouter );
}   

module.exports = route;