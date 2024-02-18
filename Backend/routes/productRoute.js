const express = require('express');
const { getProduct,getProductByID,upload,deleteProduct,updateProduct,createProduct} = require('../controllers/productController');
const auth = require('../middle/auth');
const productRouter = express.Router();
// const limit = require('../controllers/limit')
productRouter.post('/update-product/:product_id',updateProduct);
productRouter.get('/' ,getProduct);
productRouter.post('/create-product',upload.single('image'), createProduct);
productRouter.get('/get-product/:product_id',getProductByID);
productRouter.get('/delete-product/:product_id',deleteProduct);

module.exports = productRouter