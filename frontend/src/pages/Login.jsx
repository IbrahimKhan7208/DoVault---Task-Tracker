import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import Font from 'react-font'

const Login = () => {
  const [form, setform] = useState({email:"", password:""})
  const navigate = useNavigate()

  const changeHandler = (e)=>{
    setform({...form, [e.target.name]: e.target.value})
  }

  const submitHandler = async (e)=>{
    e.preventDefault()
    const res = await axios.post('https://dovault-task-tracker.onrender.com/api/users/login', form, { withCredentials: true })
    if (res.data.error) {
      console.error(res.data.error);
      alert(res.data.error);
    } else {
      navigate('/home', { state: res.data });
    }
  }

  return (
    <div className='bg-zinc-200 w-full h-screen'>
        <div className='absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] p-4 w-fit rounded-xl bg-[#b79681] shadow-xl'>
          <form onSubmit={submitHandler} autoComplete='off'>
            <div className="flex items-center justify-between p-2 ">
              <Font family='Monoton'>
                <h1 className='text-white text-3xl'>DoVault</h1>
              </Font>
              <h1 className='text-zinc-800 text-3xl font-semibold tracking-tighter mb-4 flex items-center justify-center'>Log In</h1>
            </div>
              <input type='email' name='email' placeholder='E-Mail' onChange={changeHandler} className='mb-4 p-2 h-12 w-78 bg-white border-2 border-black rounded flex' />
              <input type='password' name='password' placeholder='Password' onChange={changeHandler} className='mb-4 p-2 w-78 h-12 bg-white border-2 border-black rounded flex' />
              <div className='flex justify-between items-center'>
                <a href='/' className='text-sky-200 underline'>don't have an account?</a>
                <input type='submit' value="Log In" className='bg-white rounded p-2 border-2 border-black'/>
              </div>
          </form>
        </div>
    </div>
  )
}

export default Login