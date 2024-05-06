const { response } = require("express");
const CartModel = require("../model/cartModel");
const jwt = require("jsonwebtoken");
const cartModel = require("../model/cartModel");
require("dotenv").config();

const addToCart = async (req, res) => {
  const { userId, iat } = jwt.decode(req.cookies.token, process.env.SECRET_KEY);
  const { product_id, quantity } = req.body;

  const data = cartModel.findOne({ product_id: product_id });
  if (data) {
    const cart = await cartModel.findOneAndUpdate(
      { product_id: product_id },
       {$inc:{quantity:quantity}},
      { new: true }
    );
    res.send("data updated");
  } else {
    const cartCreate = await cartModel.create({
      user_id: userId,
      product_id: product_id,
      quantity: quantity,
    });
    res.send("data created");
  }
};

const increment = async (req, res) => {
  const { product_id, quantity } = req.body;
  const {user_id,iat}=jwt.decode(req.cookies.token,process.env.SECRET_KEY)

  const cart = await CartModel.findOne({ user_id:user_id});

  if (cart) {
    const data = await CartModel.findOneAndUpdate(
      { product_id: product_id },
      {$inc:{quantity:quantity}},
      { new: true }
    );

    res.send("incremented")
  }
};


const decrement=async(req,res)=>{
    const {product_id,quantity}=req.body
    const {user_id,iat}=jwt.decode(req.cookies.token,process.env.SECRET_KEY)
    const cart=await cartModel.findOne({user_id:user_id})
    if (cart) {
        const data =await cartModel.findOneAndUpdate(
            {product_id:product_id},
            {$inc:{quantity:-quantity}},
            {new:true}
        )

        res.send("decremented")
    }
}


const deleteItem=async(req,res)=>{
    const {product_id}=req.body
    const {user_id,iat}=jwt.decode(req.cookies.token,process.env.SECRET_KEY)
    const cart=await cartModel.findOne({user_id:user_id})

    if (cart) {
        const data=await cartModel.findOneAndDelete({product_id:product_id},{new:true})
        res.send("item deleted")
    }
}