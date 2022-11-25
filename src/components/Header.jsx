import React from 'react'
import { useState,useEffect,useContext } from 'react'
import lupa from '../assets/icons/lupa.png'
import lupablanca from '../assets/icons/lupaBlanca.png'
import btnSalir from '../assets/icons/salir.png'
import cerrar from '../assets/icons/cerrar.png'
import { StoreContext } from './storeProvider/StoreProvider'
import {gapi}from'gapi-script'
import GoogleLogin,{GoogleLogout} from 'react-google-login'
import { getImgRandom } from './services/getImgRandom'

const initialTendencies=['Wallpapers','Otoño','Salud','Gato','Carros','Paisajes','Tecnologia']

const headers = ({setSearch}) => {
  const [img,setImg]=useState("")
  const [hide,setHide]=useState(true)
  const [width,setWidth]=useState(window.innerWidth)
  const [user,setUser]=useContext(StoreContext)
  const [laodPerfil,setLoadPerfil]=useState(false)
  const [valueInput,setValueInput]=useState("");
  const [tendencies,setTendencies]=useState(initialTendencies);
  const clientId="808873499983-g0igj41h6dcnibfgporjfb9q4126v6cj.apps.googleusercontent.com"
  
  const handleInput=(e)=>{
    setValueInput(e.target.value)
  }
  
  const tamanioW=()=>{
    setWidth(window.innerWidth)
  }
  
  const buttonSearch=()=>{
    setSearch({value:valueInput,page:1})
    setValueInput("");
  }
  
  const accionTendencies=(tendencie)=>{
    setSearch({value:tendencie,page:1})
  }
 
  const onSucces=(res)=>{
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
  
  const handleKey=(e)=>{
    if(e.key==="Enter"){
      // setSearch(valueInput)
      buttonSearch()
      setValueInput("")
    }
  }
  useEffect(()=>{
    getImgRandom(setImg)
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
          <div style={{zIndex:"1000"}}  className='md:px-4 py-4 fixed bg-slate-900 bg-opacity-50 flex justify-between items-center w-screen z-10'>
            {hide&&<h1 className='text-2xl font-mono text-white underline md:mr-28'>ImageStore</h1>}
            
            <div className={`md:flex bg-white rounded-lg grow md:py-1 items-center pl-2 border-2 ${hide?"hidden":"flex"}`}>
              <button className="w-6 h-6" onClick={()=>buttonSearch()}>
                <img className="" src={lupa}/>
              </button>
              <input value={valueInput} 
                className={` px-2 w-full outline-0 rounded-lg `} 
                placeholder='fotos,imagenes' 
                onChange={handleInput}
                onKeyPress={handleKey}
              />
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
                        {user.imgUrl&&<img className='w-5 md:w-8 rounded-full' referrerPolicy='no-referrer' src={user.imgUrl+"?sz=200"} alt="s" />}
                        <span className='ml-2 overflow-hidden text-xs '>{user?.name}</span>  
                        <GoogleLogout clientId={clientId} 
                          onLogoutSuccess={responseLogout}
                          onFailure={responseLogout}
                          render={(renderProps)=>
                            <button className='p-1 w-4 h-4 md:w-5 md:h-5 ml-2 bg-white rounded-full' onClick={renderProps.onClick}>
                              <img src={btnSalir}/>
                            </button>
                          }>
                          </GoogleLogout>
                    </div>}
              </div>
            </div>
            
          </div>
          <div  className={`relative w-screen h-80  md:h-desktopView flex justify-center flex-wrap items-center`}>
            <img className='absolute w-full h-full object-cover md:h-desktopView' src={img} alt="" />
            <div className='text-white text-center z-10'>
              <span className='text-2xl sm:text-4xl bg-slate-700 bg-opacity-50 px-2'>Encuentra inspiracion para tus ideas.</span>
              <p className='text-md sm:text-2xl mt-8 bg-slate-700 bg-opacity-50 px-2'>Unete a la comunidad de ImageStore,el almacen de millones de fotos</p>
            </div>
          <div className='w-full absolute bottom-0 text-white justify-center flex flex-wrap '>
            <p className='p-2 mb-2 bg-slate-700 bg-opacity-50'>Tendencias</p>
            <ul className='flex w-full overflow-x-scroll md:overflow-hidden'>
              {tendencies.map((item,i)=>{
                return <li key={i} onClick={()=>accionTendencies(item)}
                className='p-2 border-b md:border flex-grow text-center cursor-pointer hover:bg-black hover:bg-opacity-20'
                  >
                  {item}
                  </li>
              })}
            </ul>
          </div>
          </div>
        </div>
    </>
  )
}

export default headers