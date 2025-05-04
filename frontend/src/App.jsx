import React from 'react'
import {Routes, Route} from "react-router-dom"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Create from './pages/Create'
import Task from './pages/Task'
import Cards from './components/Cards'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/create' element={<Create/>} />
      <Route path='/task' element={<Task/>}/>
      <Route path='/cards'  element={<Cards/> } />
    </Routes>
  )
}

export default App