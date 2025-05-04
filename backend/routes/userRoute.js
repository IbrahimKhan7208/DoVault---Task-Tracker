const express = require("express")
const router = express.Router()
const {userSignup, userLogin, userLogout} = require("../controllers/authController")
const {isLoggedIn} = require('../middleware/logoutMiddleware')


router.post('/signup', userSignup)
router.post('/login', userLogin)
router.post('/logout', userLogout)
router.get('/home', isLoggedIn, (req, res)=>{
    res.json({message: "Login First"})
})

module.exports = router