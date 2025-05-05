const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
app.set("trust proxy", 1);
const port = process.env.PORT || 3000
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoute')
const projectRoutes = require('./routes/projectRoute')
const taskRoutes = require('./routes/taskRoute')
const cookieParser = require('cookie-parser')
const cors = require("cors")
const path = require('path')

app.use(cookieParser())
  
app.use(cors({
  origin: true,
  credentials: true,
}));


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, 'frontend/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'))
})

app.listen(port , (req, res)=>{
    connectDB()
    console.log("Server Running")
})