const express = require('express');
const SignUpController = require('../app/controllers/SignUpController');
const router = express.Router();

router.post('/registerSuccess', SignUpController.createAccount);

router.get('/', SignUpController.signUpRender);

module.exports = router;
