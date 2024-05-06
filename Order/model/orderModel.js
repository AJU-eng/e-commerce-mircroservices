const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  orders: [
    {
      types: Object,
    },
  ],

});

module.exports = mongoose.model("orders", orderSchema);
