

const taskModel = require('../models/task');
const jwt = require('jsonwebtoken');



const SECRET_KEY = 'Task'


const createTask =  async (req, res) => {



    const { task, desc, status, start, Duration, StartTask } = req.body;
    const newTask = await taskModel.create({
        task: task,
        desc: desc,
        status: status,
        userId: req.userId,
        catId: req.body.catId,
        Duration: Duration,
        StartTask: StartTask
    })


    try {

        await newTask.save();
        res.status(201).json(newTask);


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong " });


    }

}

const catByTask = async (req, res) => {
    try {

        const taskData = await taskModel.find({ _id: req.body.task_id }).populate('catId');
        res.status(200).json(taskData)
    } catch (err) {
        console.log(err)
    }

}





const updateTask = async (req, res) => {

    const id = req.params.id;
    const { task, desc, status } = req.body;

    const newNote = {
        task: task,
        desc: desc,
        status: status,
        userId: req.userId
    }

    try {

        await taskModel.findByIdAndUpdate(id, newTask, { new: true });
        res.status(200).json(newNote);

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: "something went wrong" });


    }

}

const deleteTask = async (req, res) => {


    const id = req.params.id;
    try {
        const task = await taskModel.findByIdAndDelete(id);
        res.status(201).json(task);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong" });
    }

}

const getTask = async (req, res) => {

    try {

        const task = await taskModel.find({ userId: req.userId });

        res.status(200).json(task);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong " });

    }
}

const getTaskByStatus = async (req, res) => {
    // const user = req.query.user;

    try {

        const counts = await TaskModel.aggregate([
            // { $match: { user: ObjectId(user) } },
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);

        const result = {};
        counts.forEach((item) => {
            result[item._id] = item.count;
        });
        res.json(result);
    } catch (error) {
        console.error('Error retrieving task counts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getTask,
    catByTask,
    getTaskByStatus

}
