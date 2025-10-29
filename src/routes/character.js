const express = require('express');
const CharacterController = require('../app/controllers/CharacterController');
const router = express.Router();


router.get('/char', CharacterController.checkApiKey, CharacterController.getCharacterByName);

router.get('/charInfo', CharacterController.checkApiKey, CharacterController.getCharInfoByName);



module.exports = router;