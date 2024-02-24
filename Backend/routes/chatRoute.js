const express =require('express');
const chatRouter = express.Router();
const {getMessage,chatbyproduct,sendMessage} =  require('../controllers/chatController');
chatRouter.get('/chatbyproduct/:product_id',chatbyproduct);

chatRouter.get('/:user_id/:product_id',getMessage);
chatRouter.post('/sendMessage/:user_id',sendMessage);

module.exports = chatRouter