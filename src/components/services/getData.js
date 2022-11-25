const getData=async(searching,setImgcollection,page,refDash)=>{
    
    const apiKey="F0JbiI0z9pk9X77VFHVwu4bYrK7GH2W_-9uo6gzH69k"
    const URL=`https://api.unsplash.com${searching&&"/search"}/photos/?client_id=${apiKey}&query=${searching}&per_page=40&page=${page}`
    
    const response=await fetch(URL);
    const data=await response.json()
    console.log(data)
    setImgcollection(searching?data.results:data)
    searching&&refDash.current.scrollIntoView({block: "start", behavior: "smooth"})
  }

  export default getData;