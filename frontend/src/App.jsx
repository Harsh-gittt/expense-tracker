import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/HeroPage1'

const App = () => {
  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <Navbar />
      <main className="flex flex-1 overflow-hidden">
        <Hero />
      </main>
    </div>
  )
}

export default App