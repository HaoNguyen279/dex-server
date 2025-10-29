const express = require('express');
const SiteController = require('../app/controllers/SiteController');
const LaptopController = require('../app/controllers/LaptopController');
const router = express.Router();


router.get('/home', LaptopController.index);

router.get('/laptops/:slug', LaptopController.detail);

router.get('/', LaptopController.index);



module.exports = router;