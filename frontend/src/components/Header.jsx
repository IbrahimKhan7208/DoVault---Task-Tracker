import React from 'react'
import axios from "axios";
import Font from 'react-font'
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()

    const clickHandler = async (e) => {
        console.log("Clicked")
        await axios.post("/api/users/logout");
        navigate("/");
      };
    
  return (
      <div className="flex items-center justify-between p-2 h-18 bg-[#906a53]">
        <Font family='Monoton'>
          <h1 className='text-white text-3xl font-medium'>DoVault</h1>
        </Font>
        <button
          onClick={clickHandler}
          className="bg-zinc-300 rounded mr-5 p-3 border-3 border-black font-semibold tracking-tighter"
        >
          Log Out
        </button>
      </div>
  )
}

export default Header