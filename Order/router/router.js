const express=require("express")
const { placeOrder } = require("../controller/orderController")

const orderRouter=express.Router()


orderRouter.get("/placeOrder",placeOrder)


module.exports=orderRouter