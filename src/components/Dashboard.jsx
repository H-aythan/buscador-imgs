import React from 'react'
import { useState,useEffect } from 'react'
import ReactDOM from 'react-dom'
import Modal from '../components/modal/Modal'
import like from '../assets/icons/like.jpg'

const Dashboard = ({imgCollection,refDashBoard}) => {
    const [id,setId]=useState()
    const [modal,setModal]=useState(false)
    const [selectedImg,setSelectedImg]=useState()
    
    
    useEffect(()=>{
        
        
    },[imgCollection])
    
    const modalAaccion=(accion,dataImg)=>{
        if(accion==="open"){
            document.getElementById("body").style.overflow="hidden"
            setModal(true)
            
            setSelectedImg(dataImg)
        }else{
            document.getElementById("body").style.overflow="visible"
            setModal(false)
        }
    }

    // F0JbiI0z9pk9X77VFHVwu4bYrK7GH2W_-9uo6gzH69k acces key
    // rMVUF2dq2mAJll7qJGu3nYwEWcY9mQHfj4C01GK85X0 secret key 
    return (
      <>
        {modal&&ReactDOM.createPortal(<Modal modalAccion={modalAaccion} selectedImg={selectedImg}/>,document.querySelector("#portal"))}
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-5' ref={refDashBoard}>
            {imgCollection?.map((item,i)=>{ 
                return <div className='relative flex flex-col overflow-hidden cursor-pointer bg-white text-xs' key={item.id}  onMouseOver={()=>setId(item.id)} onMouseOut={()=>setId(false)}>
                    <img className='h-40 md:h-60 object-cover' src={item.urls.small} onClick={()=>modalAaccion("open",item)}/>
                        <span className={`bg-slate-800 absolute -bottom-4 min-w-full opacity-20 text-white bg-opacity-70 flex px-1 justify-between px-2
                            ${id===item.id?"visible opacity-100 -translate-y-4 transition ease-in-out duration-500":"invisible"}
                            `}>
                        <div className=''>subido: {item.created_at.split('T')[0]}</div>
                        <div className='flex items-center'>
                            {item.likes}<img className='w-4 h-4 rounded-full ml-1' src={like}/>
                        </div>
                    </span>
                </div>
                })}
                
        </div>
        
    </>
  )
}

export default Dashboard