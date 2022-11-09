import React from 'react'
import { useState,useEffect,useContext } from 'react'
import lupa from '../assets/icons/lupa.png'
import lupablanca from '../assets/icons/lupaBlanca.png'
import btnSalir from '../assets/icons/salir.png'
import cerrar from '../assets/icons/cerrar.png'
import { StoreContext } from './storeProvider/StoreProvider'
import {gapi}from'gapi-script'
import GoogleLogin,{GoogleLogout} from 'react-google-login'

const headers = () => {
  const [img,setImg]=useState("")
  const [hide,setHide]=useState(true)
  const [width,setWidth]=useState(window.innerWidth)
  const [user,setUser]=useContext(StoreContext)
  const [laodPerfil,setLoadPerfil]=useState(false)
  const clientId="808873499983-g0igj41h6dcnibfgporjfb9q4126v6cj.apps.googleusercontent.com"
  console.log(user)
  
  const tamanioW=()=>{
    setWidth(window.innerWidth)
  }
  
  const onSucces=(res)=>{
    console.log(res)
    setLoadPerfil(true)
    const{googleId,imageUrl,givenName}=res.profileObj;
    
    setUser({name:givenName,
      imgUrl:imageUrl,
      googleId,
    })
    const timer=setTimeout(()=>{
      setLoadPerfil(false)
      
    },1000)

    //  clearTimeout(timer)
  }
  
  const onFailure=(res)=>{
    console.log(res)
  }
  
  const responseLogout=()=>{
    setUser(undefined);
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
  
  useEffect(()=>{
    const start=()=>{
      gapi.auth2.init({
        clientId:clientId,
        scope:''
      })
    }
    gapi.load("client:auth2",start)
  })
  
  return (
      <>
        <div className='flex items-center flex-col mb-5 md:mb-10 '>
          <div className='md:px-4 py-4 fixed bg-slate-900 bg-opacity-50 flex justify-between items-center w-screen z-10'>
            {hide&&<h1 className='text-2xl font-mono text-white underline md:mr-28'>ImageStore</h1>}
            
            <div className={`md:flex bg-white rounded-lg grow md:py-1 items-center pl-2 border-2 ${hide?"hidden":"flex"}`}>
              <button className="w-6 h-6">
                <img className="" src={lupa}/>
              </button>
              <input className={` px-2 w-full outline-0 rounded-lg `} placeholder='fotos,imagenes'/>
            </div>
            <div className='md:ml-20 flex ml-5 items-center shrink-0'>
              {hide&&<button className='w-5 h-5 md:hidden' onClick={()=>setHide((state)=>!state)}>
                <img src={lupablanca}/>
              </button>}
              {!hide&&<button className='w-4 h-4 md:hidden' onClick={()=>setHide((state)=>!state)}>
                <img src={cerrar}/>
              </button>}
              <div className='flex'>
                  
                  {laodPerfil&&<button className='flex bg-transparent p-1 px-2 items-center text-white'>
                    Iniciando sesion<svg className='animate-spin ml-2 w-6 h-6 border-4 border-l-blue-400 rounded-full ' >......</svg>
                  </button>}
                  
                  {!user&&<GoogleLogin clientId={clientId}
                    render={(renderProps)=><button 
                        className='p-1 px-2  bg-transparent text-white hover:bg-white hover:text-black
                        border border-white font-semibold ml-4 text-xs md:text-base'
                        onClick={renderProps.onClick}
                        >
                          Iniciar sesion
                        </button>}
                    onSuccess={onSucces}
                    onFailure={onFailure}
                    cookiePolicy="single_host_policy"
                    isSignedIn={true}
                    >
                      </GoogleLogin>}
                    
                    {laodPerfil||user&&<div className='flex text-white items-center ml-2 md:w-32 mr-2'>
                        {user.imgUrl&&<img className='w-5 md:w-8 rounded-full'  src={user.imgUrl+"?sz=200"} alt="s" />}
                        <span className='ml-2 overflow-hidden text-xs '>{user?.name}</span>  
                        <GoogleLogout clientId={clientId} 
                          onLogoutSuccess={responseLogout}
                          onFailure={responseLogout}
                          render={(renderProps)=>
                            <button className='p-1 w-5 h-5 ml-2 bg-white rounded-full' onClick={renderProps.onClick}>
                              <img src={btnSalir}/>
                            </button>
                          }>
                          </GoogleLogout>
                    </div>}
              </div>
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