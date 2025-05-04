import React from 'react'
import Font from 'react-font'

function Background() {
  return (
    <>
      <div className='fixed z-[2] w-full h-screen'>
        <Font family='Monoton'>
           <h1 className='absolute text-[#906a53] text-[7vw] tracking-tighter leading-none top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] font-semibold ' >DoVault</h1>
        </Font>
      </div>
    </>
  )
}

export default Background