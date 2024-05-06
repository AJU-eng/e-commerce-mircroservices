const productModel = require("../model/productModel");

const AddProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    const productExist = await productModel.findOne({ name });
    if (productExist) {
      throw new Error("product already exists");
    } else {
      const data = await productModel.create({
        name,
        Price:price,
        description,
        stock,
      });
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
};


const getProducts=async(req,res)=>{
    try {
        const product=await productModel.find({})
        console.log(product);
    } catch (error) {
        console.log(error);
    }
}


module.exports={
    AddProduct,
    getProducts
}
