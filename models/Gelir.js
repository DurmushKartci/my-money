const mongoose = require("mongoose");

const GelirSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required:[true,""],        
    },
    title:{
        type:String,
        required:[true,"Lütfen bir başlık ekleyiniz."],
        unique: true,
        trim:true,
        maxLength: [ 200, "Başlık en fazla 200 karakter olabilir"]

    },
    description:{
        type:String,
        required:false,
        maxLength: [500, "Açıklama en fazla 500 karakter olabilir"]
    },
    amount:{
        type:Float,
        required:[true,"Gelir miktarını girmelisiniz"]
    }
})

mongoose.exports = mongoose.Schema.Gelir || mongoose.model("Gelir",GelirSchema)