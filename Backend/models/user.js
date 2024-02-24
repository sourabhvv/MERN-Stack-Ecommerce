const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
            username:{
                type:String,
                required:true
            },
            userType:{
                type:String,
                default:"user"
            },
            password:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            }

        },{timestamps:true});
    
    module.exports =  mongoose.model('User',UserSchema);