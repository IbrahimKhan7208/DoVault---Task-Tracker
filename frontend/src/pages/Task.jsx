import React, { useState } from 'react'
import Background from "../components/Background";
import Header from "../components/Header";
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom';

const Task = () => {
  const [form, setform] = useState({taskTitle:"", taskDescription:""})
  const navigate = useNavigate()
  const location = useLocation()
  const project = location.state
  console.log("Task Page Render")
  console.log(project)

  const changeHandler = (e)=>{
    setform({...form, [e.target.name]: e.target.value})
  }

  const submitHandler = async (e)=>{
    e.preventDefault()
    let res = await axios.post(`https://dovault-task-tracker.onrender.com/api/tasks/addTask/${project._id}`, form)
    setform({taskTitle:"", taskDescription:""})
  }

  return (
    <div className='bg-zinc-100 w-full h-screen'>
      <Background />
      <div className="relative z-[3]">
        <Header/>
        <div className=' p-4 w-fit'>
          <form onSubmit={submitHandler} autoComplete='off'>
              <h1 className='text-zinc-800 text-2xl ml-4 font-semibold tracking-tighter mb-4'>Add Tasks to Your <p className='text-4xl'>{project.title}</p></h1>
              <div className='ml-8'>
                <input type='text' value={form.taskTitle} name='taskTitle' onChange={changeHandler} placeholder="Task's Title" className='mb-4 p-2 h-12 w-78 bg-transparent border-2 border-black rounded flex' />
                <input type='text' value={form.taskDescription} name='taskDescription' onChange={changeHandler} placeholder="Task's Description" className='mb-4 p-2 w-78 h-12 bg-transparent border-2 border-black rounded flex' />
                <div className='flex justify-evenly items-center'>
                  <input type='submit' value="Add Tasks" className='bg-[#906a53] font-semibold w-28 rounded p-2 border-2 border-black'/>
                  <a href='/home' className='tracking-tighter text-xl font-semibold text-zinc-700 underline'>View Your Projects.</a>
                </div>
              </div>
          </form>
        </div>
        </div>
    </div>
  )
}

export default Task