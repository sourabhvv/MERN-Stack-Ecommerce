const chatmodel = require('../models/chatModel');
const productModel = require('../models/product');


const getMessage = async (req, res) => {
    const user_id = req.params.user_id; 
    const product_id = req.params.product_id;
    // return req.params;
    try {
        const messages = await chatmodel.find({ senderId: user_id, product_id: product_id });
        res.status(201).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const chatbyproduct = async (req, res) => {
    const product_id = req.params.product_id;
    console.log(product_id);

    try {
        const distinctEmails = await chatmodel.aggregate([
            { $match: { product_id: product_id } },
            { $group: { _id: "$senderId", email: { $addToSet: "$senderEmail" } } }
        ]);
        
        const users = distinctEmails.map(item => ({ _id: item._id, email: item.email[0] }));
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
const sendMessage = async (req, res) => {
    
    const { product_id, message, senderEmail, senderId, senderType } = req.body;

    try {
        const product = await productModel.findById(product_id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await chatmodel.create({
            message,
            product_id,
            senderEmail,
            senderId,
            senderImage: req.body.senderImage || 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
            senderType
        });

        res.status(201).json({ message: "Message sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = {
    sendMessage,getMessage,chatbyproduct
}