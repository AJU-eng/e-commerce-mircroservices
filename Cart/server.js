const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const express=require("express")
const connectDB=require("./config/DB_config")
const app=express()



app.use(bodyParser())
app.use(cookieParser())

connectDB().then(()=>app.listen(1000,()=>console.log("cart server is running")))









