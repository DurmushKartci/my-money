const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Lütfen bir email giriniz."],
        unique: true,
        trim:true,        

    },
    password:{
        type:String,
        required:[true,"Lütfen bir şifre giriniz."],        
    },
    name:{
        type:String,
        required:true,
        maxLength: [100, "İsminiz en fazla 100 karakter olabilir"]
    },
    surname:{
        type:String,
        required:true,
        maxLength: [100, "Soyisminiz en fazla 100 karakter olabilir"]
    },
    balanca:{
        type:Number,
        required:false,
        default:0       
    }
})

module.exports = mongoose.models.User || mongoose.model("User",UserSchema)