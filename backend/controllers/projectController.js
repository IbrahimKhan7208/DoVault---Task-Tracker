const projectModel = require("../models/project")
const userModel = require("../models/user")

const createProject = async (req , res)=>{
    let user = await userModel.findOne({email: req.user.email})
    let {title, description} = req.body

    let project = await projectModel.create({
        title,
        description,
        createdBy: user._id
    })

    user.projects.push(project._id)
    await user.save()
    res.cookie("projectTitle", project.title)
    res.json(project)
}

const deleteProject = async(req, res)=>{
    const {projectId} = req.params
    const project = await projectModel.findByIdAndDelete(projectId)
    res.json(project)
}

const createPage = async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email})
    res.json(user)
}

module.exports = {createProject, createPage, deleteProject}