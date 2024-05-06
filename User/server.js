const express = require("express");
const connectDB = require("./config/dbConnect");
const router = require("./router/router");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser())



app.use("/user",router)

connectDB()
  .then(() => app.listen(4000, () => console.log("User server started")))
  .catch((err) => console.log(err));
