const express = require('express');
const router = express.Router();
const HospitalController = require('../app/controllers/HospitalController');

router.get("/main", HospitalController.index);
module.exports = router;