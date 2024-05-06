const OrderModel = require("../model/orderModel");
const KafkaConfig = require("../kafk_config");
require("dotenv").config();
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { resolve } = require("promise");
const orderModel = require("../model/orderModel");
const placeOrder = async (req, res) => {
  //   try {

  const { user_id, iat } = jwt.decode(
    req.cookies.token,
    process.env.SECRET_KEY
  );

  console.log("api called");
  const kafka = new KafkaConfig();

  let users;

  await new Promise((resolve) => {
    kafka.consume("user-details", async (value) => {
      users = JSON.parse(value);

      let data = await userModel.create({
        name: users.name,
        email: users.email,
        password: users.password,
      });

      console.log(data, "inserted data");

      console.log("the", JSON.parse(value));
      resolve();
    });
  });
  const obj = req.body;

  const data = await orderModel.create({
    userId: user_id,
    $push: { orders: obj },
  });

  res.send("ordered succesfully");
};

module.exports = {
  placeOrder,
};
