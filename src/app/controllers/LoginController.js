const mongoose = require('mongoose');
const User = require('../models/User');
const Session =  require('../models/Session');
const Laptop = require('../models/Laptop');

class LoginController{
    // [GET] Sign in site rendering
    signInRender(req, res,next){
        res.render('login', { user: {} });
    }
    // [GET] Log out account 
    async logout(req, res, next){
        try{
            const sessionIdCookies = req.cookies.sessionId;
            await Session.deleteOne({sessionId: sessionIdCookies});
            res.setHeader('Set-Cookie', 'sessionId=; max-age=0; Path=/; httpsOnly; Secure').redirect('/');
            return;
        }
        catch(error){
            res.json({error: error.message})
        }
    }
    // [POST] Sign in action checking account
    async checkAccount(req, res, next){
        const userData = req.body;
        var test;
        User.findOne({email: userData.email})
            .then(async account =>{
                if(!account){
                    res.json({message: "Incorrect user or password!", errorCode : 403});
                    return;
                }

                if(account.password === userData.password){
                    const sessionId = Date.now().toString();
                    const session = {
                        sessionId : sessionId,
                        userId : account._id,
                        expireAt : 259200,
                        deviceInfo: "test_String"
                    }

                    await Session.create(new Session(session));
                    const lapData = await Laptop.find({});
                    res.setHeader('Set-Cookie', `sessionId=${sessionId};max-age =${session.expireAt}; httpOnly; Secure`);
                    res.render('study/signInSuccess',{useLayout: false});
                }
                else{
                    res.redirect('/login');
                    return;
                }
            })
    }
}

module.exports = new LoginController;