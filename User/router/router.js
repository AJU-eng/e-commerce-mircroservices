const express=require("express")
const { Register, Login, getUser } = require("../controller/userController")

const router=express.Router()


router.post("/register",Register)
router.post("/login",Login)
router.post("/getUser",getUser)

module.exports=router
