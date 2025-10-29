const mongoose = require('mongoose');

class UploadController{
    index(req, res, next){
        res.render('upload');
    }

    uploadHandle(req, res, next){
        
    }
}

module.exports = new UploadController;