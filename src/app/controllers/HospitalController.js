


class HospitalController{
    index(req, res, next){
        res.render('hospital/main', {user: {}, useLayout: false});
    }
}

module.exports = new HospitalController;