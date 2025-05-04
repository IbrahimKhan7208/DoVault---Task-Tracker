const taskModel = require('../models/task')
const projectModel = require("../models/project")
const userModel = require('../models/user')

const createTask = async (req, res)=>{
    let project = await projectModel.findById(req.body.projectId)
    let {taskTitle, taskDescription} = req.body

    const task = await taskModel.create({
        taskTitle,
        taskDescription,
        projectId: project._id
    })

    project.tasks.push(task._id)
    await project.save()
    res.json(task)
}

const addTask = async (req, res)=>{
    const {projectId} = req.params
    const project = await projectModel.findById(projectId)
    let {taskTitle, taskDescription} = req.body

    const task = await taskModel.create({
        taskTitle,
        taskDescription,
        projectId
    })

    project.tasks.push(task._id)
    await project.save()
    res.json(task) 
}

const deleteTask = async (req, res)=>{
    const { taskId } = req.params

    const task = await taskModel.findByIdAndDelete(taskId)
    console.log("Task Deleted")
    res.json(task)
}

const updateTask = async (req, res)=>{
    const {taskId} = req.params
    const task = await taskModel.findById(taskId)
    if(!task) return console.log("Task Not Found")
    
    task.status = "Completed"
    task.completionDate = new Date()
    await task.save()
    console.log("Task Completed")
    res.json(task)
}

const projectDetail = async (req, res)=>{
    const user = await userModel.findOne({email: req.user.email})
    let project = await projectModel.find({createdBy: user._id}).populate("createdBy").populate("tasks")
    res.json(project)
}

module.exports = {createTask, projectDetail, deleteTask, updateTask, addTask}