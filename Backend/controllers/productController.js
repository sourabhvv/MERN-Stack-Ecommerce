const productModel = require('../models/product')
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');



// Multer storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'image/'); // Destination folder for storing images
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Renaming file to avoid duplicates
    }
  });
  
  // Multer upload instance
  const upload = multer({ storage: storage });
  

const createProduct =  async (req, res) => {
    
    const { productname, description, category,price, stock} = req.body;
    const imagePath = req.file.path; 
    const newProduct = await productModel.create({
        product_name: productname,
        description: description,
        category:category,
        price: price,
        stock:stock,
        image: imagePath 
        
    })


    try {

        await newProduct.save();
        res.status(201).json({message:"Product saved Sucessfully!"});

    } catch (err) {
        res.status(500).json();


    }

}
const updateProduct = async (req, res) => {
    const { productname, description, category, price, id, stock } = req.body;
    
    try {
        const result = await productModel.findOneAndUpdate(
            { _id: req.params.product_id }, // Filter to find the product by its ID
            { $set: { // Specify the fields to update
                product_name: productname,
                description: description,
                category: category,
                price: price,
                stock: stock
            }}
        );


        if (result.n === 0) { // If no documents were matched to update
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.status(200).json({ message: "Product has been updated successfully!" });
    } catch (err) {
        res.status(500).json({ message:"Your request could not be processed. Please try again."});
    }
};


const deleteProduct = async (req,res)=>{
    const id = req.params.product_id;

    try{
    const product = await productModel.findOne({ _id:id});
    if(!product){
        return res.status(404).json({
            message:"Product not found"
        });
    }
    const image = product.image;

    
    fs.unlink(`${image}`,(err)=>{
        if(err){
            console.error("Error deleting image:", err);
            return res.status(500).json({ message: "Error deleting image" });
        }
    })

    await productModel.findByIdAndDelete({_id:id});

    res.status(201).json({ message: "Product has been deleted successfully!" });
    }catch(err){
        res.status(400).json({ message: "Your request could not be processed. Please try again." });
    }

}



const getProduct = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong " });

    }
}

const getProductByID = async (req, res) => {
    try {
        const products = await productModel.find({_id:req.params.product_id});
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong " });

    }
}

module.exports = {
    createProduct,  getProductByID,updateProduct, getProduct,upload,deleteProduct
}