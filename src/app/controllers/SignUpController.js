const mongoose = require('mongoose');
const User = require('../models/User');
const Session =  require('../models/Session');

class SignUpController{
    // [POST] Create account
    async createAccount(req, res, next){
        const userData = req.body;
        const newUser = new User(userData);
        try {
            User.create(newUser)
                .then(()=> res.render('authentication/registerSuccess', {user :{}}))
                .catch(next);
        } catch (error) {
            next(error);
        }
    }
    signUpRender(req, res, next){
        res.render('register', { user: {} });
    }
    
}

module.exports = new SignUpController;