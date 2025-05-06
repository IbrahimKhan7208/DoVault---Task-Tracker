import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import CountryDropdown from '../components/CountryDropdown'
import axios from "axios";
import Font from 'react-font'


const Signup = () => {
    const [form, setform] = useState({name:"", email:"", password:"", country:""})
    const navigate = useNavigate()

    const changeHandler = (e)=>{
      setform({ ...form, [e.target.name]: e.target.value})
      console.log(form)
    }

    const submitHandler = async (e)=>{
      e.preventDefault()
      try {
        const res = await axios.post('/api/users/signup', form, {withCredentials: true});
        if (res.data.error){
          alert(res.data.error) 
        }
        else{
          navigate('/home', {state: res.data})
        }
      } catch (err) {
        console.error("Signup failed:", err.message);
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
              <h1 className='text-zinc-800 text-3xl font-semibold tracking-tighter mb-4 flex items-center justify-center'>Sign Up</h1>
            </div>
              <input type='text' name='name' placeholder='Name' onChange={changeHandler} className='mb-4 p-2 h-12 w-78 bg-white border-2 border-black rounded flex' />
              <input type='email' name='email' placeholder='E-Mail' onChange={changeHandler} className='mb-4 p-2 h-12 w-78 bg-white border-2 border-black rounded flex' />
              <input type='password' name='password' placeholder='Password' onChange={changeHandler} className='mb-4 p-2 w-78 h-12 bg-white border-2 border-black rounded flex' />
              <CountryDropdown value={form.country} onChange={changeHandler}/>
              <div className='flex justify-between items-center'>
                <a href='/login' className='text-sky-200 underline'>already have an account?</a>
                <input type='submit' value="Sign Up" className='bg-white rounded p-2 border-2 border-black'/>
              </div>
          </form>
        </div>
    </div>
  )
}

export default Signup