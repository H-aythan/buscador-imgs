import React from 'react'

const TableInfo = ({selectedImg}) => {
    
    
    return (
     <>
        <li className='flex border-b py-1 text-xs md:text-base bg-emerald-400 text-white px-1 rounded'>
            <p>Width</p>:<p className='pl-1'>{selectedImg.width}</p>
        </li>
        <li className='flex border-b py-1 text-xs md:text-base bg-gray-500 text-white px-1 rounded'>
            <p>Height</p>:<p className='pl-1'>{selectedImg.height}</p>
        </li>
        <li className='flex border-b py-1 text-xs md:text-base bg-emerald-400 text-white px-1 rounded'>
            <p>likes</p>:<p className='pl-1'>{selectedImg.likes}</p>
        </li>
        <li className='flex border-b py-1 text-xs md:text-base items-center bg-gray-500 text-white px-1 rounded'>
            <p>subido</p>:<p className='pl-1 text-xs'>{selectedImg.created_at.split('T')[0]}</p>
        </li>

    </>
  )
}

export default TableInfo