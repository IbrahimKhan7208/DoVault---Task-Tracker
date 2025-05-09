const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoute')
const projectRoutes = require('./routes/projectRoute')
const taskRoutes = require('./routes/taskRoute')
const cookieParser = require('cookie-parser')
const cors = require("cors")

app.use(cookieParser())    
app.use(cors());
  
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  connectDB()
  console.log(`Server Running on port ${port}`)
});