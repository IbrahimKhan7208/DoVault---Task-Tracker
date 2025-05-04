const userModel = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSignup = async (req, res) => {
  console.log("Hit")
  let { name, email, password, country} = req.body;
  console.log("Received body:", req.body);

  const existingUser = await userModel.findOne({email: req.body.email})
  if (existingUser){
    return res.json({error: "E-Mail already exists"})
  }

  bcrypt.hash(password, 10, async function(err, hash) {
    const user = await userModel.create({
      name,
      email,
      password: hash,
      country,
    });
    let token = jwt.sign({ email: req.body.email}, process.env.SECRET);
    res.cookie("token", token)
    res.json(user);
});

};

const userLogin = async (req, res) => {
  const user = await userModel.findOne({email: req.body.email });
  if(!user) return res.json({ error: "Something went wrong"})

  bcrypt.compare(req.body.password, user.password, function(err, result) {
    if(result){
      let token = jwt.sign({ email: req.body.email}, process.env.SECRET);
      res.cookie("token", token)
      res.json(user);
    }
    else{
      res.json({ error: "Something went wrong123"})
    }
  });
};

const userLogout = (req, res) => {
  res.clearCookie("token");
  res.json({ error: "Logged out successfully" });
};

module.exports = {userSignup, userLogin, userLogout}