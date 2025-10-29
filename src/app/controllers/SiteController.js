const genshindb = require("genshin-db");
const User = require('../models/User');

class SiteController{
    async index(req, res, next){
        const user = await User.findById(req.session.userId);
        res.render('home', { user });
    } 
}

module.exports = new SiteController;