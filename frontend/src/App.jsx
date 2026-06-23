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
      <Route path="/signup" element={<Signup />} />
      <Route path="/user" element={<XpenseList/>} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  )
}

export default App