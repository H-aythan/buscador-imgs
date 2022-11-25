import React from 'react'
import { useEffect,useState,useRef,useId } from 'react'
import iconPerson from '../../../assets/icons/iconPerson.jpg'

const initialValues={name:"",coment:"",id:"",userId:"",imgUrl:""}

const TextArea = ({addComent,user,commentEdit,setCommentEdit,coments,setComents}) => {
    const [value,setValue]=useState(initialValues)
    const textAreaRef=useRef("")
    //console.log(value)
    useEffect(()=>{
        if(commentEdit){
            setValue({coment:commentEdit.coment,id:commentEdit.id})
        }
    },[commentEdit])
    
    useEffect(()=>{
        cancelButton()
    },[coments])
    const handleTextArea=(e)=>{
        setValue({...value,name:user?.name,coment:e.target.value,userId:user?.googleId,imgUrl:user?.imgUrl})
    }
    
    const cancelButton=()=>{
        setValue(initialValues)
        setCommentEdit("")
    }
    
    const commentButton=()=>{
        if(value.id===""){
            const id=Math.floor((Math.random() * (1000 -1 + 1)) +1);
            addComent({...value,id})
            
            
        }else{
            const newCommentAdd=coments?.map((item)=>item.id===value.id?value:item)
            setComents(newCommentAdd)
            
        }
        setValue(initialValues)
        setCommentEdit(initialValues)
    }
    useEffect(()=>{
        if(textAreaRef){
            const currentRef=textAreaRef.current
            currentRef.style.height = "0px";
            const scrollHeight = currentRef.scrollHeight;
            currentRef.style.height = scrollHeight + "px";
        }
    },[textAreaRef,value])


    return (
        <div className='w-full lg:w-4/5 '>
            <div className='flex'>
                <img className="w-8 h-8 mr-3 rounded-full" referrerPolicy='no-referrer' src={user?.imgUrl?user.imgUrl:iconPerson}/>
                <span className='text-xs mb-5 text-blue-500'>{user?user?.name:"user"}</span>
            </div>
            <textarea placeholder='comenta aqui' ref={textAreaRef} onChange={handleTextArea} value={value.coment}
                className='w-full pb-2 focus:border-blue-500 outline-none border-b-2 resize-none overflow-hidden text-xs'
            ></textarea>
            {value.coment?.length!==0&&<div className='float-right'>
                <button onClick={()=>cancelButton()} 
                    className="bg-red-600 px-2 py-2 text-white rounded mr-2 hover:bg-red-400 text-xs md:text-base"
                >
                    Cancelar
                </button>
                <button onClick={()=>commentButton()}
                    className='bg-blue-500 px-2 py-2 text-white rounded hover:bg-blue-400 text-xs md:text-base'
                >
                    Comentar
                </button>
            </div> }
        </div>
  )
}

export default TextArea