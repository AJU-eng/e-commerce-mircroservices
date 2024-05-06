const mongoose=require("mongoose")

const cartSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Types.ObjectId
    },

    product_id:{
        type:mongoose.Types.ObjectId
    },
    
    quantity:{
      type:Number
    }

})

module.exports = mongoose.model("cart", cartSchema);