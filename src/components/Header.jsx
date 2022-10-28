import React from 'react'
import { useState,useEffect } from 'react'
import lupa from '../assets/icons/lupa.png'
import lupablanca from '../assets/icons/lupaBlanca.png'
const headers = () => {
  const [img,setImg]=useState("")
  const [hide,setHide]=useState(false)
  const [width,setWidth]=useState(window.innerWidth)
  const [hideTend,setHideTend]=useState(false)
  
  const tamanioW=()=>{
    setWidth(window.innerWidth)
  }
  
  useEffect(()=>{
    setImg(`bg-[url(https://preview.redd.it/7kvs11y094m01.jpg?auto=webp&s=f266525cf923b8f6158a7e3a1a9bfaa8dec13e90)]`)
  },[])
 
  useEffect(()=>{
    window.addEventListener("resize",tamanioW) 
     width>768&&setHide(true)
    
    return()=>{
      window.removeEventListener("resize",tamanioW)
    }
  })
  
  return (
      <>
        
        <div className='flex items-center flex-col mb-5 md:mb-10 '>
          <div className='p-4 fixed bg-slate-900 bg-opacity-50 flex justify-between items-center w-screen z-10'>
            {hide&&<h1 className='text-2xl font-mono text-white underline md:mr-28'>ImageStore</h1>}
            
            <div className={`md:flex bg-white rounded-lg grow md:py-1 items-center pl-2 border-2 ${hide?"hidden":"flex"}`}>
              <button className="w-6 h-6">
                <img className="" src={lupa}/>
              </button>
              <input className={` px-2 w-full outline-0 rounded-lg `} placeholder='fotos,imagenes'/>
            </div>
            <div className='md:ml-20 flex ml-5 items-center shrink-0'>
              <button className='w-6 h-6 md:hidden' onClick={()=>setHide((state)=>!state)}>
                <img src={lupablanca}/>
              </button>
              <button 
                className='bg-white p-1 px-2  bg-transparent text-white hover:bg-white hover:text-black
                border border-white font-semibold ml-4 text-xs md:text-base' 
                >
                Iniciar sesion
              </button>
            </div>
            
          </div>
          <div  className={`relative bg-cover bg-center w-screen h-phoneView md:h-desktopView ${img&&img} flex justify-center flex-wrap items-center`}>
            {/* <img className='w-full object-cover h-72 h-desktopView' src="" alt="" /> */}
            <div className='text-white text-center '>
              <span className='text-2xl sm:text-4xl '>Encuentra inspiracion para tus ideas.</span>
              <p className='text-md sm:text-2xl mt-8'>Unete a la comunidad de ImageStore,el almacen de millones de fotos</p>
            </div>
          <div className='w-full absolute bottom-0 text-white justify-center flex flex-wrap '>
            <p className='p-2 mb-2'>Tendencias</p>
            <ul className='flex w-full overflow-x-scroll md:overflow-hidden'>
              {[1,1,1,1,1,1,1,1,1].map((item,i)=>{
                return <li key={i} className='p-2 border-b md:border flex-grow text-center cursor-pointer hover:bg-black hover:bg-opacity-20'>contenido</li>
              })}
            </ul>
          </div>
          </div>
        </div>
    </>
  )
}

export default headers