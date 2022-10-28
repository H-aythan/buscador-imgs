import React from 'react'
import { useState } from 'react'
import iconPerson from '../../assets/icons/iconPerson.jpg'
import TextArea from './modalComponents/TextArea'
const modal = ({modalAccion}) => {
  const [name,setName]=useState("hola")
  const [coments,setComents]=useState([{name:"juan",coment:"si esta bueno"},{name:"pedro",coment:"si me gusta"}])
  const addComent=(coment)=>{
    setComents([...coments,coment])
  }
  return (
    <div style={{zIndex:"100"}} 
    onClick={()=>modalAccion()}
    className='fixed top-0 left-0 w-screen bg-black h-screen flex justify-center
      bg-opacity-50 overflow-y-scroll py-10 
    '>
        <div className='md:w-4/5 bg-white py-10 rounded-lg px-2 md:px-10 h-max flex flex-col'
          onClick={(e)=>e.stopPropagation()}
          >
          <div className='flex mb-5 border-2 flex-col xl:flex-row items-center xl:items-start'>
            <img className='md:w-4/5 mb-4' src='https://preview.redd.it/7kvs11y094m01.jpg?auto=webp&s=f266525cf923b8f6158a7e3a1a9bfaa8dec13e90'/>
            <div className='border shadow-xl rounded-lg w-4/5 xl:w-1/5 xl:ml-10 h-min px-4 py-2 '>
              <p className='text-center uppercase text-xs '>Imagen informacion</p>
              <ul className='text-center'>
                {[1,1,1,1,1].map(()=>{
                  return <li className='flex border-b py-2 text-xs md:text-base'>
                  <p>contenido</p>:<p className='pl-1'>contenido</p>
                </li>
                })}
              </ul>
            </div>
          </div>
          <span className='text-5xl '>Titulo</span>
          <div className='mt-4 w-full flex flex-col lg:flex-row md:justify-between  '>

            <div className='lg:w-1/3 h-min flex  flex-wrap lg:order-2 '>
              <span className='w-full mb-4 text-xl'>Compartenos tus ideas</span>
              <div className='w-full flex '>
                <img className="w-8 h-8 mr-3 rounded-full" src={iconPerson}/>
                <TextArea addComent={addComent}/>
              </div>
            </div>
            <ul className='w-3/5'>
              {coments.map((item,i)=>{
                return <li key={i} className='py-2 border-b flex'>
                    <img className='w-8 h-8 rounded-full' src={iconPerson}/>
                    <div className='ml-2 overflow-x-hidden'>
                      <span className='text-blue-700'>{item.name}</span>
                      <p className='text-sm break-all'>
                        {item.coment}
                      </p>
                    </div>
                  </li>
              })}
            </ul>
          </div>      
          <div className='bg-yellow-200 w-full text-yellow-700 px-4 py-2 mt-10 text-xs md:text-base'>
            <span className='text-yellow-900 '>Advertencia!</span> Tenga en cuenta que, aunque las imágenes enumeradas aquí se pueden descargar y usar de forma gratuita, es posible que algunas imágenes no tengan una autorización de modelo o propiedad. Algunas imágenes también pueden contener el logotipo de la marca con derechos de autor.</div>
        </div>
    </div>
  )
}

export default modal