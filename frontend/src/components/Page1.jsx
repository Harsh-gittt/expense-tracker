import React from 'react'
import Navbar from './Navbar'
import HeroPage1 from './HeroPage1'
const Page1 = () => {
  return (
     <div className="flex flex-col h-screen bg-white overflow-hidden">
      <Navbar />
      <main className="flex flex-1 overflow-hidden">
        <HeroPage1 />
      </main>
    </div>
  )
}

export default Page1
