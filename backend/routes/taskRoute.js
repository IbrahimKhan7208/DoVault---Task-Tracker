const express = require('express')
const router = express.Router()
const {createTask, projectDetail, deleteTask, updateTask, addTask} = require('../controllers/taskController')
const {isLoggedIn} = require('../middleware/logoutMiddleware')

router.post('/createTask', isLoggedIn, createTask)
router.get('/projectDetail', isLoggedIn, projectDetail)
router.post('/deleteTask/:taskId', isLoggedIn, deleteTask)
router.post('/updateTask/:taskId', isLoggedIn, updateTask)
router.post('/addTask/:projectId', isLoggedIn, addTask)

module.exports = router