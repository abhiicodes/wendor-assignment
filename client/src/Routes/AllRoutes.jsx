import React from 'react'
import { Route, Routes } from 'react-router'
import Login from '../components/Login'
import PageNotFound from '../components/PageNotFound'
import Products from '../components/Products'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<Products/>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes