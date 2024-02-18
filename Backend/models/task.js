const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
   
    catId:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        require:true

    },
	Duration: {
		type: Number,
		
		
	},
	StartTask: {
		type: Date,
        default: Date.now,
		
	},
   
   
   
   

}, { timestamps: true });

const Task = mongoose.model('Task', NoteSchema);

module.exports = Task;