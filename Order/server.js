const express=require("express")
const orderRouter = require("./router/router")
const bodyParser = require("body-parser")
const connectDB=require("./config/dbConnect")
const cookieParser = require("cookie-parser")

const app= express()

app.use(bodyParser())

app.use(cookieParser())

app.use("/orders",orderRouter)

connectDB().then(()=>app.listen(2000,()=>console.log("order server started")))

