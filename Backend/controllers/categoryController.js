const categoryModel = require('../models/category');
const TaskModel = require('../models/task')


const createCategory = async (req, res) => {
    // console.log(req.userId)


    const { name } = req.body;

    const newCategory = new categoryModel({
        name: name,
        userId: req.userId,

    })
    try {



        await newCategory.save();
        res.status(201).json({ newCategory });


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong," });


    }



}



const getCategory = async (req, res) => {


    try {

        const cat = await categoryModel.find();
    
        res.status(200).json(cat);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong " });

    }





}

const getTaskByCategory =  async (req, res) => {
    
    try {
      const taskCountByCategory = await TaskModel.aggregate([
     
        { $group: { _id: '$categoryId', TaskCount: { $sum: 1 } } },
      ]);
  
      res.json(taskCountByCategory);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving task counts.' });
    }
  };



module.exports = {
    createCategory,
    getCategory,
    getTaskByCategory
    
}