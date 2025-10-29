const express = require("express");
const router = express.Router();
const UploadController = require('../app/controllers/UploadController');

router.get('/', UploadController.index);

router.get('/api', UploadController.uploadHandle);

module.exports = router;

