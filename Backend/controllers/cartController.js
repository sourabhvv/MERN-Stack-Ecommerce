const cartModel = require('../models/cartModel');
const productModel = require('../models/product');
const { getProduct } = require('./productController');


const getCart = async (req, res) => {
    const user_id = req.params.user_id;
    const cartData = await cartModel.findOne({ user_id: user_id });
    if (!cartData) {
        return res.status(404).json({ message: "No Product in the cart" });
    }

    const products = [];
    let total_price = 0; 

    const userProducts = cartData.products;

    for (const product of userProducts) {
        const productData = await productModel.findOne({ _id: product.product_id });
        const price = productData.price * product.quantity;
        total_price += price; 
        products.push({
            _id:productData._id,
            product_name: productData.product_name,
            image: productData.image,
            description: productData.description,
            originalPrice: productData.price,
            price: price,
            quantity: product.quantity
        });
    }

    const UserCartItem = {
        products: products,
        total_price: total_price 
    };

    res.status(200).json(UserCartItem);
};


const deleteFromCart = async (req,res)=>{
    const user_id = req.params.user_id; 
    const { product_id} = req.body;
  
    try{
    //all cart data of that user
    let cartData = await cartModel.findOne({ user_id: user_id });

   // find the index at where the product is saved
    const existingProductIndex  = cartData.products.findIndex(p=>p.product_id._id.equals(product_id));

    const productQuantity =  cartData.products[existingProductIndex].quantity;
    // remove the product from cart 

    cartData.products.splice(existingProductIndex,1);
    await cartData.save();

    await productModel.findOneAndUpdate(
        { _id:product_id}, 
        {$inc:{stock:productQuantity }}
    );

    res.status(200).json({ message: "Product  deleted From Cart successfully!" });

    }catch(err){
        res.status(500).json({ message: err.message });
    }

   

}


const addToCart = async (req, res) => {
    const user_id = req.params.user_id; 
    const { product_id, quantity } = req.body;

    try {
        if (!user_id || !product_id || !quantity || isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        const product = await productModel.findOne({ _id: product_id });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }else if(product.stock<1){
            return res.status(404).json({ message: "out of Stock " });
        }

      
        const total_price = product.price * quantity;

        let cartData = await cartModel.findOne({ user_id: user_id });
        const currentStock = product.stock-1;
        if (!cartData) {
            cartData = await cartModel.create({
                user_id: user_id,
                products: [{ product_id: product_id, quantity: quantity }],
                total_price: total_price
            });

           
            await productModel.findOneAndUpdate(
                { _id: product_id }, // Filter to find the product by its ID
                { $set: { // Specify the fields to update
                    stock: currentStock
                }}
            );

            
        } else {

            const existingProductIndex  = cartData.products.findIndex(p=>p.product_id._id.equals(product_id));

            if(existingProductIndex !== -1){
             cartData.products[existingProductIndex].quantity +=1;
            
            }else{
            cartData.products.push({ product_id: product_id, quantity: quantity });
            }
            await productModel.findOneAndUpdate(
                { _id: product_id }, 
                { $set: { 
                    stock: currentStock
                }}
            );

            cartData.total_price += total_price;
            await cartData.save();
        }

        return res.status(201).json({ message: `${product.product_name} added To Cart` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to add to cart!" });
    }
}


module.exports = {
    addToCart,getCart,deleteFromCart
}



