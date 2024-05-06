const express=require("express")
const connectDB=require("./config/dbConnect")
const app=express()
const bodyParser=require("body-parser")
const productRouter = require("./router/router")

app.use(bodyParser())

app.use("/product",productRouter)





connectDB().then(()=>app.listen(3000,()=>console.log("Product server started")))




