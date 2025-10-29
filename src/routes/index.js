const express = require('express');
const characterRouter = require("./character")
const siteRouter = require('./site');
const loginRouter = require('./login');
const uploadRouter = require('./upload');
const registerRouter = require('./register');
const cartRouter = require('./cart');
const studyRouter = require('./study');
const hospitalRouter = require('./hospital');

function route(app){
    app.use('/api', characterRouter );

    app.use('/login', loginRouter );
    
    app.use('/upload', uploadRouter );

    app.use('/register', registerRouter );

    app.use('/cart', cartRouter);

    app.use('/study', studyRouter);
    
    app.use('/hospital', hospitalRouter);


    app.use('/',siteRouter );


}   

module.exports = route;