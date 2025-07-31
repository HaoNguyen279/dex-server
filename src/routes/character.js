const express = require('express');
const CharacterController = require('../controllers/CharacterController');
const router = express.Router();


router.get('/', CharacterController.index);

module.exports = router;