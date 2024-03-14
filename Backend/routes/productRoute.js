const express = require('express');
const { getProduct,getProductByID,upload,deleteProduct,updateProduct,createProduct} = require('../controllers/productController');
const auth = require('../middle/auth');
const adminAuth = require('../middle/adminAuth');
const productRouter = express.Router();
// const limit = require('../controllers/limit')



productRouter.post('/update-product/:product_id',adminAuth,updateProduct);
productRouter.get('/' ,auth,getProduct);
productRouter.get('/admin-product' ,adminAuth,getProduct);

productRouter.post('/create-product',adminAuth,upload.single('image'), createProduct);
productRouter.get('/get-product/:product_id',auth,getProductByID);
productRouter.get('/delete-product/:product_id',adminAuth,deleteProduct);

module.exports = productRouter