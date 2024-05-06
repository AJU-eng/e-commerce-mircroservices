const express=require("express")
const { AddProduct, getProducts } = require("../controller/productController")

const productRouter=express.Router()


productRouter.post("/addProduct",AddProduct)
productRouter.get("/getProduct",getProducts)


module.exports=productRouter