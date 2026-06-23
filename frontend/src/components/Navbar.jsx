import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className='flex justify-between items-center px-12 py-4 bg-white border-b border-gray-100 shadow-sm'>
      <div className='flex items-center gap-2.5'>
        <div className='w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md'>
          <span className='text-white font-black text-base'>₹</span>
        </div>
        <h1 className='font-bold text-xl text-gray-900 tracking-tight'>Expense Tracker</h1>
      </div>

      <div className='flex items-center gap-8'>
        <a className='text-gray-500 hover:text-gray-900 font-medium text-sm transition-colors duration-200' href="#">Home</a>
        <a className='text-gray-500 hover:text-gray-900 font-medium text-sm transition-colors duration-200' href="#">Contact</a>
        <a className='text-gray-500 hover:text-gray-900 font-medium text-sm transition-colors duration-200' href="#">About</a>
        <Link to="/XpenseList">
          <button className='bg-gray-900 text-white text-sm font-semibold rounded-xl px-5 py-2.5 transition-all duration-300 hover:bg-emerald-500 hover:shadow-lg active:scale-95' >
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar