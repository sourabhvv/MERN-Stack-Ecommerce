const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'product',
        require:true
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    }
})

const cartSchema = new mongoose.Schema({
  
    user_id:{
        type:String,
        required:true
    },
    products:[{
        type:productSchema,
        required:true
    }],
    total_price:{
        type:Number,
        require:true
    }


});

const cart = mongoose.model('cart', cartSchema);
module.exports = cart;
