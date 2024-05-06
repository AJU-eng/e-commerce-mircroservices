const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")
const KafkaConfig=require("../kafka_config")
const Register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    console.log("api called");

    const userExist = await userModel.findOne({ email: email });
    console.log(userExist);
    if (userExist) {
      console.log("done");
      throw new Error("User already exist");
    } else {
      console.log("test");
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
     
      const data = await userModel.create({
        name: name,
        email: email,
        password: hash,
      });

      const kafka=new KafkaConfig()
     
      const message=[
        {key:"users",value:JSON.stringify(data)}
      ]

      kafka.produce("user-details",message)

      // const message=[{key:"secret_key",value:JSON.stringify(process.env.SECRET_KEY)}]

      // kafka.produce("secret-key",message)

      // await kafka.producer.disconnect()

      console.log("hey");
      

      const token =  jwt.sign({user_id:data._id},process.env.SECRET_KEY)
      res.cookie("token",token,{
        httpOnly:true
      }).status(200).send(data)

    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
      const pass = bcrypt.compareSync(password, userExist.password);
      if (pass) {
       const useToken=jwt.sign({user_id:userExist._id},process.env.SECRET_KEY)
       res.cookie("token",useToken,{
        httpOnly:true
       }).send("logined")
      } else {
        res.send("incorrect password");
      }
    } else {
      throw new Error("user not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const getUser=async(req,res)=>{
  console.log(req.body);
   const {id}=req.body
   const user=await userModel.findOne({_id:id})
   console.log(user);
}

module.exports = {
  Register,
  Login,
  getUser
};
