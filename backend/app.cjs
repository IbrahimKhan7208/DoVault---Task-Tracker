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
const fs = require('fs')

app.use(cookieParser())    
app.use(cors({
  origin: true,
  credentials: true,
}));
  
app.use(express.json())
app.use(express.urlencoded({extended: true}))

try {
  app.use('/api/users', userRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/tasks', taskRoutes);
} catch (err) {
  console.error('Error setting up routes:', err);
}


console.log('Current directory:', __dirname);
console.log('Directory structure:');
try {
  const files = fs.readdirSync(__dirname);
  console.log(files);

  if (fs.existsSync(path.join(__dirname, '..'))) {
    console.log('Parent directory contents:');
    console.log(fs.readdirSync(path.join(__dirname, '..')));
  }
} catch (err) {
  console.error('Error reading directory:', err);
}

const staticPath = path.join(__dirname, '../frontend/dist');
console.log('Using static path:', staticPath);

app.use(express.static(staticPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(port, () => {
  connectDB()
  console.log(`Server Running on port ${port}`)
});