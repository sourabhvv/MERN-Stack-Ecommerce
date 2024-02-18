const express = require('express');
const categoryRouter = express.Router();
const auth = require('../middle/auth');
const { createCategory, getCategory ,getTaskByCategory} = require('../controllers/categoryController');

categoryRouter.post('/', auth ,createCategory)
categoryRouter.get('/', getCategory)
categoryRouter.get('/taskBy' , auth , getTaskByCategory)



module.exports = categoryRouter;