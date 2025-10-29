const express = require('express');
const CartController = require('../app/controllers/CartController');
const router = express.Router();

router.post('/add', CartController.authorizationChecker, CartController.addToCart);

router.post('/remove', CartController.authorizationChecker, CartController.removeFromCart);

router.get('/payment', CartController.authorizationChecker, CartController.paymentHandle);

router.get('/', CartController.authorizationChecker, CartController.viewCart);

module.exports = router;