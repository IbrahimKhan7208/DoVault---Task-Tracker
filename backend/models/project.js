const mongoose = require("mongoose")

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required:true,
    },
    createdBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "task"
    }]
})

module.exports = mongoose.model("project", projectSchema)