import React from 'react'
import Page1 from './components/Page1'
import Card from './components/Card'
import Signup from './components/Signup'
import SignIn from './components/SignIn'
import { Routes, Route } from 'react-router-dom';
import XpenseList from './components/XpenseList';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/XpenseList" element={<XpenseList/>} />
      <Route path="/SignIn" element={<SignIn />} />
    </Routes>
  )
}

export default App