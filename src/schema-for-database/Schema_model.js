const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const uniqueValidator = require('mongoose-unique-validator');
const res = require('express/lib/response');
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
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

Signup.methods.generateToken = async function(){
try {
    const token =jwt.sign({_id:this._id.toString()},"mynameisharshdavdasoftwaredeveloper");
    this.tokens=this.tokens.concat({token} )
    return token;
} catch (error) {
    res.send("the error part:"+ error);
    console.log("the error part:"+ error);
}
}
Signup.plugin(uniqueValidator, { message: 'Email already in use!' });
const signUpData = mongoose.model("signUpData",Signup);
module.exports = {signUpData};