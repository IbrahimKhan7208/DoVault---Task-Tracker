const mongoose = require("mongoose")

const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_DB)
    .then(console.log("DB Connected"))
    .catch((err)=> console.error(err))
}

module.exports = connectDB