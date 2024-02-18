const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    product_name:{
     type:String,
     required:true
    },

    description:{
     type:String,
     required:true
    },

    price:{
        type:Number,
        required:true
    },
    category:{
      type:String,
      required:true  
    },
    stock:{
        type:Number,
        required:true
    },
    image: {
        type: String 
      },
    created_at:{
        type:Date,
        default:Date.now
    }

});

const products = mongoose.model('products',productSchema);
module.exports = products;
