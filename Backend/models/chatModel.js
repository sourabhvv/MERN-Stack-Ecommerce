const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        message:{
            type:String,
            require:true
        },
        senderEmail:{
            type:String,
            require:true
        },
        senderId:{
            type:String,
            require:true 
        },
        senderImage:{
            type:String
           
        },
        senderType:{
            type:String,
            require:true 
        },
        product_id:{
            type:String,
            require:true 
        }, 
        created_at:{
            type:Date,
            default:Date.now
        }

    }
);

const chats = mongoose.model('chats',chatSchema);
module.exports = chats;