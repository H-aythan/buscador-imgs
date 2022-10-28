import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Head from './components/Header'
//import './App.css'

function App() {

  return (
    <div  className="box-border bg-slate-800 overflow-x-hidden">
      <Head/>
      <Dashboard/>
     
    </div>
    
  )
}

export default App
