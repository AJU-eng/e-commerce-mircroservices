const mongoose = require("mongoose");


const productSchema=mongoose.Schema({
    name:{
        type:String
    },
    Price:{
        type:Number
    },
    description:{
        type:String
    },
    stock:{
        type:Number
    }
})


module.exports =mongoose.model("products",productSchema)