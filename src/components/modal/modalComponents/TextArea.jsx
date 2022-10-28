import React from 'react'
import { useEffect,useState,useRef } from 'react'
import { } from 'react'
const initialValues={name:"",coment:""}

const TextArea = ({addComent}) => {
    const [value,setValue]=useState(initialValues)
    const textAreaRef=useRef("")
    
    const handleTextArea=(e)=>{
        setValue({name:"usuario",coment:e.target.value})
    }
    const cancelButton=()=>{
        setValue(initialValues)
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
        <div className='w-full lg:w-4/5'>
            <span className='text-xs mb-5 text-blue-500'>nombre del usuario</span>
            <textarea ref={textAreaRef} onChange={handleTextArea} value={value.coment}
                className='w-full pb-2 focus:border-blue-500 outline-none border-b-2 resize-none overflow-hidden text-xs'
            ></textarea>
            {value.coment?.length!==0&&<div className='float-right'>
                <button onClick={()=>cancelButton()} 
                    className="bg-red-600 px-2 py-2 text-white rounded mr-2 hover:bg-red-400"
                >
                    Cancelar
                </button>
                <button onClick={()=>[addComent(value),setValue(initialValues)]}
                    className='bg-blue-500 px-2 py-2 text-white rounded hover:bg-blue-400'
                >
                    Comentar
                </button>
            </div> }
        </div>
  )
}

export default TextArea