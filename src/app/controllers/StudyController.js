const Session = require('../models/Session');
const User = require('../models/User');

class StudyController {
    async index(req, res, next) {
        var sessionIdFromCookies;
        if(req.cookies && req.cookies.sessionId) {
            sessionIdFromCookies = req.cookies.sessionId;
        }
        else{
            return res.render('study/main', {user: {}, useLayout: false});
        }
        Session.findOne({sessionId : sessionIdFromCookies})
            .then((sess) =>{
                if(!sess) {
                    return res.render('study/main', {user: {}, useLayout: false});
                }
                else{
                    User.findOne({_id: sess.userId})
                        .then(user =>{
                            if(user) {
                                return res.render('study/main', {user: user, useLayout: false});
                            } else {
                                return res.render('study/main', {user: {}, useLayout: false});
                            }
                        })
                }
            }
        ).catch((err)=>{res.send({err : err.message})});
    }
    async addStreak(req, res, next) {
        var sessionIdFromCookies;
        if(req.cookies && req.cookies.sessionId) {
            sessionIdFromCookies = req.cookies.sessionId;
        }
        else{
            return res.json({message: "No session found", errorCode: 403});
        }
        Session.findOne({sessionId : sessionIdFromCookies})
            .then((sess) =>{
                if(!sess) {
                    return res.json({message: "No session found", errorCode: 403});
                }
                else{
                    User.findOne({_id: sess.userId})
                        .then(user =>{
                            if(user) {
                                user.sessionStreak += 1;
                                user.save();
                                return res.json({message: "Streak added", streak: user.sessionStreak, errorCode: 200});
                            } else {
                                return res.json({message: "User not found", errorCode: 404});
                            }
                        })
                }
            }
        ).catch((err)=>{res.json({err : err.message})});
    }
}

module.exports = new StudyController();