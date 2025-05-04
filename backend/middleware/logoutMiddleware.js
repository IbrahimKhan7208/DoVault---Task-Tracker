const jwt = require('jsonwebtoken')

function isLoggedIn (req, res, next){
    let token = req.cookies.token
    if(!token) return res.json({error: "You must be Logged In"})
    var decoded = jwt.verify(token, 'shhhhh');
    req.user = decoded
    next()
}

module.exports = {isLoggedIn}   