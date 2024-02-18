const express = require('express');
const { getTask, createTask, deleteTask, updateTask,catByTask,getTaskByStatus} = require('../controllers/taskController');
const auth = require('../middle/auth');
const taskRouter = express.Router();
// const limit = require('../controllers/limit')

taskRouter.get('/', auth ,getTask)
// taskRouter.get('/cat', auth ,getTask)
taskRouter.post('/', auth,createTask)
taskRouter.post('/catByTask',catByTask)

taskRouter.delete('/:id',auth, deleteTask)
taskRouter.put('/:id',auth, updateTask)

taskRouter.get('/getTaskByStatus' ,auth, getTaskByStatus)

module.exports = taskRouter