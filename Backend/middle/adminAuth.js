const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Task';
const userModel = require("../models/user");

const adminAuth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            const user = jwt.verify(token, SECRET_KEY); // Change 1: Removed the callback function and directly decoded the token synchronously
            req.userId = user.id;
            const isAdmin = await userModel.findOne({ _id: req.userId, userType: "admin" });
            
            if (isAdmin) {
                next();
            } else {
                res.status(401).json({ message: "Unauthorized user" });
            }
        } else {
            res.status(401).json({ message: "Unauthorized user" });
        }
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Token expired' });
        } else {
            res.status(401).json({ message: "Invalid user" });
        }
    }
}

module.exports = adminAuth;
