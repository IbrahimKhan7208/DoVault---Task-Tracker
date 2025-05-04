const express = require("express")
const router = express.Router()
const {createProject, createPage, deleteProject} = require('../controllers/projectController')
const {isLoggedIn} = require('../middleware/logoutMiddleware')

router.post('/createProject',isLoggedIn , createProject)
router.get('/createPage',isLoggedIn, createPage)
router.post("/deleteProject/:projectId", isLoggedIn, deleteProject)

module.exports = router