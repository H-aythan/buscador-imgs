import React from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import Modal from '../components/modal/Modal'
const Dashboard = () => {
    const [id,setId]=useState()
    const [modal,setModal]=useState(false)
    const modalAaccion=(accion)=>{
        if(accion==="open"){
            document.getElementById("body").style.overflow="hidden"
            setModal(true)
        }else{
            document.getElementById("body").style.overflow="visible"
            setModal(false)
        }
    }
    return (
      <>
        {modal&&ReactDOM.createPortal(<Modal modalAccion={modalAaccion} />,document.querySelector("#portal"))}
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-5' >
        {[0,1,2,3,4,5,6,7,8,9,10,11].map((item,i)=>{
            return <div className='relative flex flex-col overflow-hidden cursor-pointer' key={i}  onMouseOver={()=>setId(item)} onMouseOut={()=>setId(false)}>
                <img src={'https://images.alphacoders.com/100/1003664.png'} onClick={()=>modalAaccion("open")}/>
                    <span className={`bg-slate-800 absolute -bottom-4 min-w-full opacity-20 text-white bg-opacity-70 flex px-1 
                        ${id===i?"visible opacity-100 -translate-y-4 transition ease-in-out duration-500":"invisible"}
                        `}>
                    info adwwd
                </span>
            </div>
            })}
        </div>
        <div className='w-screen flex justify-center mt-10 mb-2'>
            <ul className='flex'>
                {[1,2,3,4,5,6,7,8].map((item)=>{
                    return <li key={item} className='px-3 py-1 text-white cursor-pointer hover:bg-white hover:text-black'>{item}</li>
                })}
            </ul>
        </div>
        <div className='bg-black w-screen h-10'></div>
    </>
  )
}

export default Dashboard