import { useEffect,useState,useRef } from 'react'
import Dashboard from './components/Dashboard'
import Head from './components/Header'
import StoreProvider from './components/storeProvider/StoreProvider'
import getData from './components/services/getData'
//import './App.css'

function App() {
  const [search,setSearch]=useState({value:"",page:1})
  const [imgCollection,setImgCollection]=useState([])
  const refDashBoard=useRef()
  
  const paginacionButton=(accion)=>{
    accion==="back"
      ?setSearch(search.page>1?{...search,page:search.page-1}:{...search,page:1})
      :setSearch({...search,page:search.page+1});
    refDashBoard.current.scrollIntoView({block: "start", behavior: "smooth"})
  }
  
  useEffect(()=>{
    getData(search.value,setImgCollection,search.page,refDashBoard)

  },[search])
  
  return (
      <StoreProvider>
        <div  className="box-border bg-slate-800 overflow-x-hidden">
          <Head setSearch={setSearch} setImgCollection={setImgCollection}/>
          <Dashboard imgCollection={imgCollection} refDashBoard={refDashBoard}/>
          <div className='w-screen flex justify-center mt-10 mb-2'>
            <ul className='flex'>
              <button className='px-2 text-white hover:bg-white hover:text-black' onClick={()=>paginacionButton("back")} >
                back 
              </button>
              <button className='px-2 text-white hover:bg-white hover:text-black' onClick={()=>paginacionButton("next")} >
                next 
              </button>
                {/* {[1,2,3].map((item,i)=>{
                  return <li key={item} onClick={()=>setPage(page+1)} 
                    className={`${item===page&&"bg-white text-black"} px-3 py-1 text-white cursor-pointer hover:bg-white hover:text-black`}
                      >
                        {page+i}
                      </li>
                  })} */}
            </ul>
          </div>
          <div className='bg-black w-screen h-10'></div>
        </div>
      </StoreProvider>
  )
}

export default App
