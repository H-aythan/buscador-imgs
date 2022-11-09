import React from 'react'
import {createContext,useState} from 'react'

const StoreContext=createContext()

const StoreProvider = ({children}) => {
    const [user,setUser]=useState()
  return (
    <StoreContext.Provider value={[user,setUser]}>
        {children}
    </StoreContext.Provider>
  )
}

export {StoreContext}
export default StoreProvider