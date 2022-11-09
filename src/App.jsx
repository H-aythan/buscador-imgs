import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Head from './components/Header'
import StoreProvider from './components/storeProvider/StoreProvider'
//import './App.css'

function App() {

  return (
      <StoreProvider>
        <div  className="box-border bg-slate-800 overflow-x-hidden">
          <Head/>
          <Dashboard/>
        </div>
      </StoreProvider>
  )
}

export default App
