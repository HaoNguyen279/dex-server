
const Laptop = require('../models/Laptop');
const Session = require('../models/Session');
const User = require('../models/User');
class LaptopController {
    //[GET] Render home page
    async index(req, res, next) {
        const data = await Laptop.find({}).then(laptops=> laptops);
        var sessionIdCookies;
        if(req.cookies && req.cookies.sessionId) {
            sessionIdCookies = req.cookies.sessionId;
        }
        else{
            return res.render('home', { laptops: data, user: {} });
        }
        Session.findOne({sessionId : sessionIdCookies})
            .then((sess) =>{
                if(!sess){
                    return res.render('home', { laptops: data, user: {} });
                }else{
                    User.findOne({_id: sess.userId})
                    .then(user => {
                        res.render('home', { laptops: data, user: user });
                    })
                }
            })
            .catch((err)=>{res.send({err : err.message})});
    }
    //[GET] Render laptop detail page
    async detail(req, res, next) {
        try{    
            const slug = req.params.slug;
            const laptop = await Laptop.findOne({slug : slug});
            const sessId = req.cookies.sessionId;

            Session.findOne({sessionId : sessId})
                .then((sess) =>{
                    if(sess){
                        User.findOne({_id: sess.userId})
                            .then((user)=>{
                                if(user){
                                    return res.render('laptops/detail', { laptopDetail : laptop, user: user });
                                }
                                else{
                                    return res.render('laptops/detail', { laptopDetail : laptop, user: {} });
                                }
                            })
                    }
                    else{
                        return res.render('laptops/detail', { laptopDetail : laptop, user: {} });
                    }
                })
                .catch(err => next(err));
        }
        catch(err){
            res.send({error: err.message})
        }
    }
}

module.exports = new LaptopController;