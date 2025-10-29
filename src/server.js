const express = require("express");
const app = express();
const port = 3000;
const route = require('./routes');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/db');

    db.connect();
    
    app.use(express.json());

    app.use(express.urlencoded({extended: true}));  // Đọc json của req.body 

    app.use(cookieParser());

    app.set('views', path.join(__dirname, 'resources/views'));

    app.set('view engine', 'ejs'); // Use template engine  ejs 

    app.set('trust proxy', true); // Đọc real Public IP của user request

    app.use(express.static(path.join(__dirname, 'public')));
    
    app.use(expressLayouts);

    app.set('layout', 'layouts/layout');

    route(app);

    app.listen(port, () =>{
        console.log("Server is running on port : " + port);
    }); 




