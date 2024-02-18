const express = require('express');
const {getCart,addToCart,deleteFromCart} = require('../controllers/cartController');
const auth = require('../middle/auth');
const cartRouter = express.Router();


cartRouter.get('/:user_id' ,getCart);
cartRouter.post('/addtocart/:user_id' ,addToCart);
cartRouter.post('/delete-product/:user_id' ,deleteFromCart);



module.exports = cartRouter