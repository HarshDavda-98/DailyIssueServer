const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Signup = mongoose.Schema({
    Id:{
        type:Number,
    },
    EmailAdd:{
        type:String,
        unique: true,
        required:true
    },
     UserName:{
        type:String,
        required:true
    },
     FirstName:{
        type:String,
        required:true
    },
     LastName:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Confirm_Password:{
        type:String,
        required:true
    }
});
Signup.plugin(uniqueValidator, { message: 'Email already in use!' });
const signUpData = mongoose.model("signUpData",Signup);
module.exports = {signUpData};