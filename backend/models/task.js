const mongoose = require("mongoose")
const project = require("./project")

const taskSchema = mongoose.Schema({
    taskTitle: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required:true,
    },
    status:{
        type: String,
        enum:["Pending", "Completed"],
        default: "Pending"
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    completionDate: {
        type: Date
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
    }
})

module.exports = mongoose.model("task", taskSchema)