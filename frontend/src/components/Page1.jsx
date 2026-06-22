import React from 'react'
import Navbar from './Navbar'
import HeroPage1 from './HeroPage1'
import axios from 'axios'
const Page1 = () => {

    const clickHandler = async(e)=>{
        console.log(localStorage.getItem("token"))
        const response = await axios.get("http://localhost:3000/user/",{
            headers: {
                "Authorization" : localStorage.getItem("token")
            }
        }
        
        )
        console.log(response.data)
    } 

  return (

     <div className="flex flex-col h-screen bg-white overflow-hidden">
      <Navbar />
      <main className="flex flex-1 overflow-hidden">
        <HeroPage1 />
      </main>
      <button onClick={clickHandler}>Fetch Data</button>
    </div>
  )
}

export default Page1
