import React from 'react'
import { useState,useContext } from 'react'
import iconPerson from '../../assets/icons/iconPerson.jpg'
import cerrar from '../../assets/icons/cerrar.png'
import { StoreContext } from '../storeProvider/StoreProvider'
import TextArea from './modalComponents/TextArea'
import TableInfo from './modalComponents/TableInfo'
import puntos from '../../assets/icons/puntos.png'
import like from '../../assets/icons/like.jpg'
import iconCollection from '../../assets/icons/collectionIcon.png'

const Modal = ({modalAccion,selectedImg}) => {
  const [coments,setComents]=useState([{userId:"1",name:"juan",coment:"Es una buena imagen!"},{userId:"2",name:"pedro",coment:"me gusta"}])
  const [user]=useContext(StoreContext);
  const [alert,setAlert]=useState(false)
  
  const [hideButtonComment,setHideButtonComment]=useState(false)
  const [commentEdit,setCommentEdit]=useState("")
  
  const addComent=(coment)=>{
    user
      ?setComents([...coments,coment])
      :setAlert(true)
  } 
  
  const updateComment=(comment)=>{
    setHideButtonComment("cerrar")
    setCommentEdit(comment)
  }
  
  const deleteComment=(id)=>{
    setHideButtonComment(false)
    const newComments=coments.filter(item=>item.id!==id)
    setComents(newComments);
    setCommentEdit("")
  }
  const modal=(e)=>{
    e.stopPropagation()
    setHideButtonComment(false)
  }
  const menuAccion=(e,item)=>{
    e.stopPropagation()
    setHideButtonComment(item.id)
  }
  return (
    <div style={{zIndex:"1000"}} 
      onClick={()=>modalAccion("close")}
      className='fixed top-0 left-0 w-screen bg-black h-screen flex justify-center
        bg-opacity-50 overflow-y-scroll py-10 
      '>
          <div className='md:w-4/5 bg-white py-10 rounded-lg px-2 md:px-10 h-max flex flex-col relative'
              onClick={(e)=>modal(e)}
            >
            <button className='w-5 absolute right-0 top-0 m-4' onClick={()=>modalAccion("close")}>
              <img src={cerrar}/>
            </button>
            <div className='flex mb-5 flex-col xl:flex-row items-center xl:items-start'>
              <div className='md:w-4/5 mb-4 xl:h-desktopView border-2 flex justify-center'>
                <img className='object-contain h-full' src={selectedImg.urls.raw}/>
              </div>
              <div className='border shadow-xl rounded-lg w-4/5 xl:w-1/5 xl:ml-10 h-min px-4 py-2 '>
                <p className='text-center uppercase text-xs '>Imagen informacion</p>
                <ul className='text-center'>
                  <TableInfo selectedImg={selectedImg}/>
                </ul>
              </div>
            </div>
            <span className='text-2xl'>
              <div className='flex  items-center'>
                <img className='rounded-full' src={selectedImg.user.profile_image.medium}/>
                <div className='mx-4'>
                  <span >{selectedImg.user?.name}</span>
                  <div>
                    <div className='w-5 flex text-xs items-center'>
                      <span>{selectedImg.user.total_likes}</span>
                      <img className='mx-1 rounded-full' src={like}/>
                      <span className='text-xs'>Like</span>
                    </div>
                    <div className='w-5 flex text-xs items-center'>
                      <span>{selectedImg.user.total_photos}</span>
                      <img className='mx-1 rounded-full' src={iconCollection}/>
                      <span className='text-xs'>Colleccion</span>
                    </div>
                  </div>
                </div>
              </div>
            </span>
            <div className='mt-4 w-full flex flex-col lg:flex-row md:justify-between  '>

              <div className='lg:w-1/3 h-min flex  flex-wrap lg:order-2 '>
                <span className='w-full mb-4 xl:text-xl'>Compartenos tus ideas</span>
                <div className='w-full flex flex-wrap'>
                  {alert&&<span className='w-full text-xs my-2 bg-red-500 p-1 text-white'>Inicia sesion para poder comentar!</span>}
                  
                  <TextArea addComent={addComent} user={user} commentEdit={commentEdit} setCommentEdit={setCommentEdit} coments={coments} setComents={setComents}/>
                </div>
              </div>
              <ul className='lg:w-3/5'>
                {coments.map((item,i)=>{//console.log(item.id)
                  return <li key={i} className='py-2 border-b flex relative mb-3'
                   
                  >
                      <img className='w-8 h-8 rounded-full' src={item.imgUrl?item.imgUrl:iconPerson}/>
                      <div className='ml-2 overflow-x-hidden '>
                        <span className='text-blue-700'>{item.name}</span>
                        <p className='text-sm break-all'>
                          {item.coment}
                        </p>
                      </div>
                      {item.userId===user?.googleId&&<div className='right-10 absolute'>
                          <div className={` w-5  cursor-pointer`} onClick={(e)=>menuAccion(e,item)}>
                            <img src={puntos}/>
                          </div>
                          <div className='absolute'>
                            {hideButtonComment===item.id&&<div className='w-20 text-white text-xs bg-slate-700 flex flex-col -translate-x-1/2 -translate-y-4' 
                                onMouseLeave={()=>setHideButtonComment(false)}
                                
                              >
                              <button className='py-1 hover:bg-white hover:text-black' onClick={()=>updateComment(item)}>Editar</button>
                              <button className='py-1 hover:bg-white hover:text-black' onClick={()=>deleteComment(item.id)}>Eliminar</button>
                            </div>
                            }
                          </div>
                        </div>}
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

export default Modal