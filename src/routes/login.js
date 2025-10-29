const express = require('express');
const LoginController = require('../app/controllers/LoginController');
const router = express.Router();


router.get('/logout', LoginController.logout);

router.get('/', LoginController.signInRender);

router.post('/', LoginController.checkAccount);

module.exports = router;