import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home'
import About from '../../pages/About'

const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='about' element={<About/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default Router